<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class DetailUserController extends Controller
{
    /**
     * Display the user detail page.
     *
     * @return \Inertia\Response
     */
    public function detailUser(User $user): \Inertia\Response
    {
        // Load the user with their donations, forums, and affairs
        // Untuk donations, ambil juga donationCategory dan hanya satu image pertama
        $profileUser = $user->load([
            'donations' => function ($query) {
                $query->with([
                    'donationCategory',
                    'donationImages' => function ($imageQuery) {
                        $imageQuery->limit(1)->oldest();
                    }
                ])->withCount('comments');
            },
            'forums' => function ($query) {
                $query->withCount('comments');
            },
            'affairs'
        ]);

        $totalUserComments = $user->comments()->count();

        $totalUserLikes = \App\Models\Like::whereIn(
            'forum_id',
            $user->forums()->pluck('id')
        )->count();

        // Return the Inertia response with the user data
        return inertia('user/detail', [
            'profileUser' => $profileUser,
            'totalUserComments' => $totalUserComments,
            'totalUserLikes' => $totalUserLikes,
        ]);
    }
}
