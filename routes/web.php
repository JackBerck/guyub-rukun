<?php

use App\Http\Controllers\DonationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])
    ->name('home');

Route::get('/tentang-kami', function () {
    return Inertia::render('about');
})->name('about');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get("donate")->name("donation.donate.create");
    Route::post("donate", [DonationController::class, "storeDonate"])->name("donation.donate.store");
    Route::get("donate/{donation:slug}/edit",[DonationController::class,"editDonate"])->name("donation.donate.edit");
    Route::put("donate/{donation:slug}/edit", [DonationController::class, "update"])->name("donation.donate.update");

    Route::get("help")->name("donation.help.create");
    Route::get("help/{donation:slug}/edit",[DonationController::class,"editHelp"])->name("donation.help.edit");
    Route::post("help", [DonationController::class, "storeHelp"])->name("donation.help.store");
    Route::put("help/{donation:slug}/edit", [DonationController::class, "update"])->name("donation.help.update");

    Route::delete("donation/{donation:slug}",[DonationController::class,""])->name("donation.remove");

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
