<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get("/", fn() => "hello world")->name("post");
