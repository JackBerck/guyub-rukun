<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCommentForumRequest;
use App\Http\Requests\CreateDonateRequest;
use App\Http\Requests\CreateHelpRequest;
use App\Http\Requests\UpdateDonationRequest;
use App\Models\Comment;
use App\Models\Donation;
use App\Models\DonationCategory;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function getDonation()
    {
        return Donation::with(["donationCategory", "donationImages", "user", "comments.user"])
            ->latest()
            ->where('type', 'donation')
            ->cursorPaginate(4);
    }

    public function getHelp()
    {
        return Donation::with(["donationCategory", "donationImages", "user", "comments.user"])
            ->latest()
            ->where('type', 'request')
            ->cursorPaginate(4);
    }

    public function createDonate()
    {
        $donationCategories = \App\Models\DonationCategory::all();

        return Inertia::render('donation/create', [
            'donationCategories' => $donationCategories,
        ]);
    }

    public function storeDonate(CreateDonateRequest $request): RedirectResponse
    {
        try {
            $user = request()->user();
            $data = $request->validated();
            $data["type"] = "donation";

            $donation = $user->donations()->create($data);
            Log::info('Data images:', $data['images']);

            // Simpan setiap file gambar ke relasi donationImages
            if (isset($data['images']) && is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    $path = $image->store('donation-images', 'public');
                    Log::info("Image stored at: $path");
                    $donation->donationImages()->create(['image' => $path]);
                }
            }

            // You can return JSON or redirect as needed
            return redirect()->route('home')
                ->with('status', "Postingan $donation->title berhasil dibuat");
        } catch (\Exception $e) {
            // Log the error or handle as needed
            return back()->withErrors(['error' => "Postingan gagal dibuat"])
                ->withInput();
        }
    }

    public function viewDonate(Donation $donation)
    {
        $donation->load([
            'donationImages',
            'user',
            'comments.user',
            'donationCategory',
        ]);

        $relatedDonations = Donation::with(['donationCategory', 'user'])
            ->where('type', 'donation')
            ->where('donation_category_id', $donation->donation_category_id)
            ->where('id', '!=', $donation->id)
            ->latest()
            ->take(3)
            ->get();

        return Inertia::render('donation/detail', [
            'donation' => $donation,
            'relatedDonations' => $relatedDonations,
        ]);
    }

    public function createHelp()
    {
        $donationCategories = \App\Models\DonationCategory::all();

        return Inertia::render('request/create', [
            'donationCategories' => $donationCategories,
        ]);
    }

    public function storeHelp(CreateHelpRequest $request)
    {
        try {

            $user = request()->user();
            $data = $request->validated();
            $data["type"] = "request";

            $help = $user->donations()->create($data);

            // Simpan setiap file gambar ke relasi donationImages
            if (isset($data['images']) && is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    $path = $image->store('donation-images', 'public');
                    $help->donationImages()->create(['image' => $path]);
                }
            }

            // You can return JSON or redirect as needed
            return redirect()->route('home')
                ->with('status', "Postingan $help->title berhasil dibuat");
        } catch (\Exception $e) {
            Log::error($e->getMessage()); // Log error untuk debugging
            return back()->withErrors(['error' => "Postingan gagal dibuat"])->withInput();
        }
    }

    public function viewHelp(Donation $donation)
    {
        return Inertia::render('request/detail', [
            'donation' => $donation->load([
                'donationImages',
                'user',
                'comments.user',
                'donationCategory',
            ]),
        ]);
    }

    public function editDonate(Donation $donation)
    {
        return Inertia::render("donation/edit", [
            'donation' => $donation->load(['donationImages']),
            'donationCategories' => DonationCategory::all(),
        ]);
    }

    public function editHelp(Donation $donation)
    {
        return Inertia::render("request/edit", [
            'help' => $donation->load(['donationImages']),
            'donationCategories' => \App\Models\DonationCategory::all(),
        ]);
    }

    public function update(UpdateDonationRequest $request, Donation $donation): RedirectResponse
    {
        try {

            if ($donation->user_id !== Auth::id()) {
                return back()->withErrors(['error' => "Anda tidak memiliki izin untuk memperbarui donasi ini"]);
            }

            $data = $request->validated();
            $data["type"] = $donation->type;

            // Update donation data
            $donation->update($data);

            return redirect()->route('profile.donations')
                ->with('status', "Postingan $donation->title berhasil diperbarui");
        } catch (\Exception $e) {
            Log::error($e->getMessage()); // Log error untuk debugging
            return back()->withErrors(['error' => "Postingan gagal diperbarui"])
                ->withInput();
        }
    }

    public function remove(Donation $donation): RedirectResponse
    {
        try {

            if ($donation->user_id !== Auth::id()) {
                return back()->withErrors(['error' => "Anda tidak boleh menghapus postingan ini. Postingan gagal dihapus"]);
            }

            // Delete the donation
            $donation->delete();

            return redirect()->route('profile.donations')
                ->with('status', "Postingan $donation->title berhasil dihapus");
        } catch (\Exception $e) {
            return back()->withErrors(['error' => "Postingan gagal dihapus"]);
        }
    }

    public function comment(CreateCommentForumRequest $request, Donation $donation)
    {
        try {
            $data = $request->validated();

            // Ambil user ID dari pengguna yang sedang login
            $data["user_id"] = Auth::id();

            // Simpan gambar jika ada
            if ($request->hasFile('image')) {
                $data["image"] = $request->file('image')->store('comment-images', 'public');
            }

            // Simpan komentar
            $donation->comments()->create($data);

            return redirect()->back()->with('status', 'Komentar berhasil ditambahkan');
        } catch (\Exception $e) {
            // Log error untuk debugging
            Log::error($e->getMessage());

            // Redirect kembali dengan pesan error
            return back()->withErrors(['error' => "Terjadi kesalahan saat menambahkan komentar. Silakan coba lagi."]);
        }
    }

    public function removeComment(Comment $comment)
    {
        try {
            // Pastikan hanya pemilik komentar yang dapat menghapus
            if ($comment->user_id !== Auth::id()) {
                return back()->withErrors(['error' => "Anda tidak memiliki izin untuk menghapus komentar ini."]);
            }

            // Hapus komentar
            $comment->delete();

            return redirect()->back()->with('status', "Komentar berhasil dihapus");
        } catch (\Exception $e) {
            // Log error untuk debugging
            Log::error($e->getMessage());

            // Redirect kembali dengan pesan error
            return back()->withErrors(['error' => "Terjadi kesalahan saat menghapus komentar. Silakan coba lagi."]);
        }
    }
}
