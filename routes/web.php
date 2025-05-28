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

    Route::get('/donasikan', function() {
        return Inertia::render('donation/create');
    })->name('create.donation');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
