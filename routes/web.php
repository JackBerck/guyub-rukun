<?php

use App\Http\Controllers\AffairController;
use App\Http\Controllers\DetailUserController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\ForumController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])
    ->name('home');

Route::get('/about-us', function () {
    return Inertia::render('about');
})->name('about');

Route::get('/contact', function () {
    return Inertia::render('contact');
})->name('contact');

// Route General
Route::get("user/{user:id}", [DetailUserController::class, "detailUser"])->name("user.detail");
Route::get("donation/{donation:slug}", [DonationController::class, "viewDonate"])->name("donation.donate.view");
Route::get("forum/{forum:slug}", [ForumController::class, "view"])->name("forum.view");
Route::get("affair/{affair:slug}", [AffairController::class, "view"])->name("affair.view");
Route::get("help/{donation:slug}", [DonationController::class, "viewHelp"])->name("donation.help.view");

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Route Donate and help
    Route::get("donate", [DonationController::class, "createDonate"])->name("donation.donate.create");
    Route::get("donate/{donation:slug}/edit", [DonationController::class, "editDonate"])->name("donation.donate.edit");
    Route::post("donate", [DonationController::class, "storeDonate"])->name("donation.donate.store");
    Route::put("donate/{donation:slug}/edit", [DonationController::class, "update"])->name("donation.donate.update");

    Route::get("need-help", [DonationController::class, "createHelp"])->name("donation.help.create");
    Route::get("help/{donation:slug}/edit", [DonationController::class, "editHelp"])->name("donation.help.edit");
    Route::post("need-help", [DonationController::class, "storeHelp"])->name("donation.help.store");
    Route::put("help/{donation:slug}/edit", [DonationController::class, "update"])->name("donation.help.update");

    Route::delete("donation/{donation:slug}", [DonationController::class, "remove"])->name("donation.remove");

    Route::post("donation/{donation:slug}/comment", [DonationController::class, "comment"])->name("donation.comment.create");
    Route::delete("donation/comment/{comment}", [DonationController::class, "removeComment"])->name("donation.comment.delete");

    // Route Forum
    Route::get("open-forum", [ForumController::class, "create"])->name("forum.create");
    Route::get("forum/search", [ForumController::class, "search"])->name("forum.search");
    Route::get("forum/{forum:slug}/edit", [ForumController::class, "edit"])->name("forum.edit");
    Route::post("forum/{forum}/like", [ForumController::class, "like"])->name("forum.like");
    Route::post("forum/{forum:slug}/comment", [ForumController::class, "comment"])->name("forum.comment.create");
    Route::post("open-forum", [ForumController::class, "store"])->name("forum.store");
    Route::put("forum/{forum:slug}/edit", [ForumController::class, "update"])->name("forum.update");
    Route::delete("forum/{forum:slug}", [ForumController::class, "remove"])->name("forum.delete");
    Route::delete("forum/{forum:slug}/{comment}", [ForumController::class, "removeComment"])->name("forum.comment.delete");

    // Route Affair
    Route::get("share-affair", [AffairController::class, "create"])->name("affair.create");
    Route::get("affair/search", [AffairController::class, "search"])->name("affair.search");
    Route::get("affair/{affair:slug}/edit", [AffairController::class, "edit"])->name("affair.edit");
    Route::post("share-affair", [AffairController::class, "store"])->name("affair.store");
    Route::put("affair/{affair:slug}/edit", [AffairController::class, "update"])->name("affair.update");
    Route::delete("affair/{affair:slug}", [AffairController::class, "remove"])->name("affair.remove");
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
