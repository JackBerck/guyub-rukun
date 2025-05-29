<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCommentForumRequest;
use App\Http\Requests\CreateDonateRequest;
use App\Http\Requests\CreateHelpRequest;
use App\Http\Requests\UpdateDonationRequest;
use App\Models\Comment;
use App\Models\Donation;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class DonationController extends Controller
{
    public function index()
    {
        return Donation::with(["donationCategory", "donationImages", "user"])
            ->latest()
            ->cursorPaginate(16);
    }

    public function createDonate()
    {
        // return inertia
    }

    public function storeDonate(CreateDonateRequest $request): RedirectResponse
    {
        try {
            $user = request()->user();
            $data = $request->validated();
            $data["type"] = "donation";

            $donation = $user->donations()->create($data);

            // Simpan setiap file gambar ke relasi donationImages
            if (isset($data['images']) && is_array($data['images'])) {
                foreach ($data['images'] as $image) {
                    $path = $image->store('donation-images', 'public');
                    $donation->donationImages()->create(['path' => $path]);
                }
            }

            // You can return JSON or redirect as needed
            return redirect()->route('donations.index')
                ->with('status', "Postingan $donation->title berhasil dibuat");
        } catch (\Exception $e) {
            // Log the error or handle as needed
            return back()->withErrors(['error' => "Postingan gagal dibuat"])
                ->withInput();
        }
    }

    public function createHelp()
    {
        // return inertia
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
            return redirect()->route('donations.index')
                ->with('status', "Postingan $help->title berhasil dibuat");
        } catch (\Exception $e) {
            Log::error($e->getMessage()); // Log error untuk debugging
            return back()->withErrors(['error' => "Postingan gagal dibuat"])->withInput();
        }

    }

    public function editDonate(Donation $donation)
    {
        // return Inertia::render()
    }

    public function editHelp(Donation $donation)
    {
        // return Inertia::render()
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

            return redirect()->route('donations.index')
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

            return redirect()->route('donations.index')
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
            \Log::error($e->getMessage());

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
            \Log::error($e->getMessage());

            // Redirect kembali dengan pesan error
            return back()->withErrors(['error' => "Terjadi kesalahan saat menghapus komentar. Silakan coba lagi."]);
        }
    }
}
