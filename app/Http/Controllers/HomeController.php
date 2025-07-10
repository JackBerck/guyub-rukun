<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\DonationRequest;
use App\Models\Forum;
use Illuminate\Http\Request;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        $popularDonations = Donation::with('user')
            ->where('is_popular', true)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();
        $popularForums = Forum::with(['user', 'forumCategory', 'comments'])
            ->where('is_popular', true)
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get();

        return inertia('index', [
            'popularDonations' => $popularDonations,
            'popularForums' => $popularForums,
        ]);
    }
}
