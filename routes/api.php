<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

// Rute untuk menghapus user secara permanen dengan middleware autentikasi
Route::middleware('auth:sanctum')->delete('/users/{id}/permanently', [UserController::class, 'destroyPermanently']);
Route::get('/users', [UserController::class, 'index']);

// Rute untuk mendapatkan data user yang terautentikasi
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
