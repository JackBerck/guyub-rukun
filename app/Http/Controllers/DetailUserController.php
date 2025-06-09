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
                        $imageQuery->limit(1)->oldest(); // Ambil 1 image pertama
                    }
                ]);
            },
            'forums',
            'affairs'
        ]);

        // Return the Inertia response with the user data
        return inertia('user/detail', [
            'profileUser' => $profileUser,
        ]);
    }
}
