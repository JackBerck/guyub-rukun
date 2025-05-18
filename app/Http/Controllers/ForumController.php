<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Pagination\CursorPaginator;

class ForumController extends Controller
{
    public function index(): CursorPaginator
    {
        return Forum::with(['user', 'forumCategory'])
            ->withCount('likedByUsers')
            ->latest()
            ->cursorPaginate(16);
    }

    public function like(Forum $forum): RedirectResponse
    {
        $user = auth()->user();

        // Cek apakah sudah like
        if ($user->likedPosts()->where('forum_id', $forum->id)->exists()) {
            $user->likedPosts()->detach($forum->id);
            return back();
        }

        $user->likedPosts()->attach($forum->id);
        return back();
    }

}
