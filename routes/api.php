<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MataPelajaranController;
use App\Http\Middleware\IsAdmin;use App\Http\Controllers\JenjangController;
use App\Http\Controllers\KontenController;

Route::get('/konten', [KontenController::class, 'index']);
Route::get('/mata-pelajaran/{id_jenjang}', [MataPelajaranController::class, 'getMataPelajaranByJenjang']);
Route::get('/jenjang/{id}', [JenjangController::class, 'show']);
Route::get('/jenjang', [JenjangController::class, 'index']);
Route::get('/users', [UserController::class, 'index']);

// Rute untuk mendapatkan data user yang terautentikasi
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
