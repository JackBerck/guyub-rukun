<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateCommentForumRequest;
use App\Http\Requests\CreateForumRequest;
use App\Http\Requests\UpdateForumRequest;
use App\Models\Comment;
use App\Models\Forum;
use App\Models\Like;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\CursorPaginator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class ForumController extends Controller
{
    public function index(): CursorPaginator
    {
        return Forum::with(['user', 'forumCategory'])
            ->withCount(['likedByUsers', 'comments'])
            ->latest()
            ->cursorPaginate(16);
    }

    public function create()
    {
        $forumCategories = \App\Models\ForumCategory::all();

        return Inertia::render('forum/create', [
            'forumCategories' => $forumCategories,
        ]);
    }

    public function search()
    {
        // return 
    }

    public function edit(Forum $forum)
    {
        return Inertia::render('forum/edit', [
            'forum' => $forum->load(['forumCategory']),
            'forumCategories' => \App\Models\ForumCategory::all(),
        ]);
    }

    public function view(Forum $forum)
    {
        $forum->load([
            'user',
            'forumCategory',
            'comments.user',
        ])->loadCount(['likedByUsers']);

        $relatedForums = Forum::with(['user', 'forumCategory'])
            ->where('forum_category_id', $forum->forum_category_id)
            ->where('id', '!=', $forum->id)
            ->latest()
            ->take(3)
            ->get();

        $forumIsLiked = $forum->likedByUsers->contains(Auth::id());

        return Inertia::render('forum/detail', [
            'forum' => $forum,
            'relatedForums' => $relatedForums,
            'forumIsLiked' => $forumIsLiked,
        ]);
    }

    public function like(Request $request, Forum $forum)
    {
        $userId = $request->input('user_id');
        $forumId = $request->input('forum_id');

        // Cek apakah sudah like
        $like = Like::where('user_id', $userId)->where('forum_id', $forumId)->first();
        if ($like) {
            $like->delete();
        } else {
            Like::create([
                'user_id' => $userId,
                'forum_id' => $forumId,
            ]);
        }
    }

    public function comment(CreateCommentForumRequest $request, Forum $forum): RedirectResponse
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
            $forum->comments()->create($data);

            return redirect()->back()->with('status', 'Komentar berhasil ditambahkan');
        } catch (\Exception $e) {
            // Log error untuk debugging
            Log::error($e->getMessage());

            // Redirect kembali dengan pesan error
            return back()->withErrors(['error' => "Terjadi kesalahan saat menambahkan komentar. Silakan coba lagi."]);
        }
    }

    public function removeComment(Comment $comment): RedirectResponse
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

    public function store(CreateForumRequest $request): RedirectResponse
    {
        try {
            // Ambil pengguna yang sedang login
            $user = Auth::user();

            // Validasi data
            $data = $request->validated();

            // Simpan thumbnail jika ada
            if ($request->hasFile("thumbnail")) {
                $data["thumbnail"] = $request->file("thumbnail")->store("forum-thumbnails", "public");
            }

            // Buat forum baru
            $user->forums()->create($data);

            // Redirect ke halaman forum dengan pesan sukses
            return redirect()->route('home')->with("status", "Forum baru berhasil dibuat");
        } catch (\Exception $e) {
            // Log error untuk debugging
            Log::error($e->getMessage());

            // Redirect kembali dengan pesan error
            return back()->withErrors(['error' => "Terjadi kesalahan saat membuat forum. Silakan coba lagi."]);
        }
    }

    public function update(UpdateForumRequest $request, Forum $forum): RedirectResponse
    {
        try {
            if ($forum->user_id !== Auth::id()) {
                return back()->withErrors(['error' => "Anda tidak memiliki izin untuk memperbarui. Postingan gagal diperbarui"]);
            }

            $forum->update($request->validated());

            return redirect()->route('profile.forums')
                ->with('status', "Postingan $request->title berhasil diperbarui");
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors(['error' => "Terjadi kesalahan saat memperbarui forum. Silakan coba lagi."]);
        }
    }


    public function remove(Forum $forum): RedirectResponse
    {
        try {
            if ($forum->user_id !== Auth::id()) {
                return back()->withErrors(['error' => "Anda tidak memiliki izin untuk menghapus forum ini. Forum gagal dihapus"]);
            }

            $forum->delete();

            return redirect()->route('donations.index')
                ->with('status', "Forum $forum->title berhasil dihapus");
        } catch (\Exception $e) {
            Log::error($e->getMessage());
            return back()->withErrors(['error' => "Forum gagal dihapus"]);
        }
    }
}
