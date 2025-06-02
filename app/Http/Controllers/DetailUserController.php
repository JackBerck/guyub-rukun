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
        // Load the user with their donations and forums
        $profileUser = $user->load(['donations', 'forums', 'affairs']);

        // Return the Inertia response with the user data
        return inertia('user/detail', [
            'profileUser' => $profileUser,
        ]);
    }
}
