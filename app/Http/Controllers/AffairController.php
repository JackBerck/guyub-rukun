<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateAffairRequest;
use App\Http\Requests\UpdateAffairRequest;
use App\Models\Affair;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class AffairController extends Controller
{
    public function index()
    {
        return Affair::with(["user", "affairCategory"])
            // ->whereDate('date', '>=', now())
            ->latest()
            ->cursorPaginate(16);
    }

    public function create()
    {
        $affairCategories = \App\Models\AffairCategory::all();

        return Inertia::render('affair/create', [
            'affairCategories' => $affairCategories,
        ]);
    }

    public function search()
    {
        // return inertia 
    }

    public function edit(Affair $affair)
    {
        return Inertia::render("affair/edit", [
            'affair' => $affair,
            'affairCategories' => \App\Models\AffairCategory::all(),
        ]);
    }

    public function view(Affair $affair)
    {
        // Cek apakah acara ini sudah lewat
        // if ($affair->date < now()) {
        //     return redirect()->route('home')->withErrors(['error' => "Acara ini sudah lewat."]);
        // }
        $affair->load(['user', 'affairCategory']);

        $relatedAffairs = Affair::with(['user', 'affairCategory'])
            ->where('date', '>=', now())
            ->where('affair_category_id', $affair->affair_category_id)
            ->where('id', '!=', $affair->id)
            ->latest()
            ->take(3)
            ->get();


        return Inertia::render('affair/detail', [
            'affair' => $affair,
            'relatedAffairs' => $relatedAffairs,
        ]);
    }

    public function store(CreateAffairRequest $request)
    {
        try {
            // Ambil pengguna yang sedang login
            $user = Auth::user();

            // Validasi data
            $data = $request->validated();

            // Simpan thumbnail jika ada
            if ($request->hasFile("thumbnail")) {
                $data["thumbnail"] = $request->file("thumbnail")->store("affair-thumbnails", "public");
            }

            // Buat forum baru
            $user->affairs()->create($data);

            // Redirect ke halaman acara dengan pesan sukses
            return redirect()->route('home')->with("status", "Acara baru berhasil dibuat");
        } catch (\Exception $e) {
            // Log error untuk debugging
            Log::error($e->getMessage());

            // Redirect kembali dengan pesan error
            return back()->withErrors(['error' => "Terjadi kesalahan saat membuat acara. Silakan coba lagi."]);
        }
    }

    public function update(UpdateAffairRequest $request, Affair $affair)
    {
        try {
            if ($affair->user_id !== Auth::id()) {
                return back()->withErrors(['error' => "Anda tidak memiliki izin untuk memperbarui. Acara gagal diperbarui"]);
            }

            $affair->update($request->validated());

            return redirect()->route('profile.affairs')
                ->with('status', "Postingan $affair->title berhasil diperbarui");
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors(['error' => "Terjadi kesalahan saat memperbarui acara. Silakan coba lagi."]);
        }
    }

    public function remove(Affair $affair)
    {
        try {
            if ($affair->user_id !== Auth::id()) {
                return back()->withErrors(['error' => "Anda tidak memiliki izin untuk menghapus acara ini. Acara gagal dihapus"]);
            }

            $affair->delete();

            return redirect()->route('profile.affairs')
                ->with('status', "Acara $affair->title berhasil dihapus");
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors(['error' => "Acara gagal dihapus"]);
        }
    }
}
