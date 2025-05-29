<?php

use App\Http\Controllers\DonationController;
use App\Http\Controllers\ForumController;
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

    // Route Donate and help
    Route::get("donate")->name("donation.donate.create");
    Route::get("donate/{donation:slug}/view")->name("donation.donate.create");
    Route::post("donate", [DonationController::class, "storeDonate"])->name("donation.donate.store");
    Route::get("donate/{donation:slug}/edit", [DonationController::class, "editDonate"])->name("donation.donate.edit");
    Route::put("donate/{donation:slug}/edit", [DonationController::class, "update"])->name("donation.donate.update");

    Route::get("help")->name("donation.help.create");
    Route::get("help/{donation:slug}/view")->name("donation.donate.create");
    Route::get("help/{donation:slug}/edit", [DonationController::class, "editHelp"])->name("donation.help.edit");
    Route::post("help", [DonationController::class, "storeHelp"])->name("donation.help.store");
    Route::put("help/{donation:slug}/edit", [DonationController::class, "update"])->name("donation.help.update");

    Route::delete("donation/{donation:slug}", [DonationController::class, ""])->name("donation.remove");

    // Route::comment("donation/{donation:slug}/comment",[]);

    // Route Forum
    Route::get("forum/create", [ForumController::class, "create"])->name("forum.create");
    Route::get("forum/search", [ForumController::class, "search"])->name("forum.create");
    Route::get("forum/{forum:slug}/edit", [ForumController::class, "edit"])->name("forum.edit");
    Route::get("forum/{forum:slug}/view", [ForumController::class, "view"])->name("forum.detail");
    Route::post("forum/{forum}/like", [ForumController::class, "like"])->name("forum.like");
    Route::post("forum/{forum:slug}/comment", [ForumController::class, "comment"])->name("forum.comment.create");
    Route::post("forum", [ForumController::class, "store"])->name("forum.store");
    Route::put("forum/{forum:slug}", [ForumController::class, "update"])->name("forum.update");
    Route::delete("forum/{forum:slug}", [ForumController::class, "remove"])->name("forum.delete");
    Route::delete("forum/{forum:slug}/{comment}", [ForumController::class, "removeComment"])->name("forum.comment.delete");

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
