<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AddedOfferController;

Route::get('/', function () {
    return view('welcome');
});

