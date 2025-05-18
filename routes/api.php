<?php

use App\Http\Controllers\AffairController;
use App\Http\Controllers\DonationController;
use App\Http\Controllers\ForumController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("donations", [DonationController::class, "index"])->name("donations.index");
Route::get("forums", [ForumController::class, "index"])->name("forum.index");
Route::get("affairs", [AffairController::class, "index"])->name("affairs.index");
