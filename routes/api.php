<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Middleware\IsAdmin;

Route::delete('/users/{id}', [UserController::class, 'destroy'])
    ->middleware(['auth:sanctum', IsAdmin::class]); // Tambahkan middleware admin

Route::get('/users', [UserController::class, 'index']);

// Rute untuk mendapatkan data user yang terautentikasi
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
