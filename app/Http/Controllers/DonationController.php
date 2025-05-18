<?php

namespace App\Http\Controllers;

use App\Models\Donation;
use Illuminate\Http\Request;

class DonationController extends Controller
{
    public function index()
    {
        return Donation::with(["donationCategory", "donationImages", "user"])
            ->latest()
            ->cursorPaginate(16);
    }
}
