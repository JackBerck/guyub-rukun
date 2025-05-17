<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ForumController extends Controller
{
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
