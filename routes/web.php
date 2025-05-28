<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])
    ->name('home');

Route::get('/tentang-kami', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/kontak', function () {
    return Inertia::render('contact');
})->name('contact');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Routes for creating various resources
    Route::get('/donasikan', function () {
        return Inertia::render('donation/create');
    })->name('donation.create');
    Route::get('/buka-forum', function () {
        return Inertia::render('forum/create');
    })->name('forum.create');
    Route::get('/butuh-bantuan', function () {
        return Inertia::render('request/create');
    })->name('request.create');
    Route::get('/sebar-acara', function () {
        return Inertia::render('affair/create');
    })->name('affair.create');

    // Routes for profile management
    Route::get('/profil', function () {
        return Inertia::render('profile/main');
    })->name('profile.settings');
    Route::get('/profil/dikomentari', function () {
        return Inertia::render('profile/commented');
    })->name('profile.commented');
    Route::get('/profil/disukai', function () {
        return Inertia::render('profile/liked');
    })->name('profile.liked');
    Route::get('/profil/donasi', function () {
        return Inertia::render('profile/donations');
    })->name('profile.donations');
    Route::get('/profil/forum', function () {
        return Inertia::render('profile/forums');
    })->name('profile.forums');
    Route::get('/profil/permintaan', function () {
        return Inertia::render('profile/requests');
    })->name('profile.requests');
    Route::get('/profil/acara', function () {
        return Inertia::render('profile/affairs');
    })->name('profile.affairs');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
