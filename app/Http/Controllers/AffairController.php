<?php

namespace App\Http\Controllers;

use App\Models\Affair;
use Illuminate\Http\Request;

class AffairController extends Controller
{
    public function index()
    {
        return Affair::with(["user", "affairCategory"])
            ->whereDate('date', '>=', now())
            ->latest()
            ->cursorPaginate(16);
    }
}
