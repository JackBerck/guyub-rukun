<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('auth')->group(function () {
    Route::redirect('settings', 'settings/profile');

    // Settings routes
    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::post('settings/profile', [ProfileController::class, 'updateImage'])->name('profile.update.image');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('appearance');

    // Settings for liked posts
    Route::get('settings/liked-posts', [ProfileController::class, 'likedPost'])->name('profile.liked-posts');

    // Settings for donations
    Route::get('settings/donations', [ProfileController::class, 'donations'])->name('profile.donations');

    // Settings for forums
    Route::get('settings/forums', [ProfileController::class, 'forums'])->name('profile.forums');

    // Settings for requests
    Route::get('settings/helps', [ProfileController::class, 'requests'])->name('profile.requests');

    // Settings for requests
    Route::get('settings/affairs', [ProfileController::class, 'affairs'])->name('profile.affairs');
});