<?php

use App\Http\Controllers\DonationController;
use App\Http\Controllers\ForumController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/", fn() => "hello world")->name("post");
Route::get("donations", [DonationController::class, "index"])->name("donations.index");
Route::get("forums", [ForumController::class, "index"])->name("forum.index");