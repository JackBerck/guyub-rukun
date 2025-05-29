<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use App\Models\DonationRequest;
use Illuminate\Http\Request;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return inertia('index', [
            $donations = Donation::with('donationCategory', 'user', 'donationImages')
                ->orderBy('created_at', 'desc')
                ->get()
        ]);
    }
}
