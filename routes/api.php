<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MataPelajaranController;
use App\Http\Controllers\JenjangController;
use App\Http\Controllers\KontenController;
use App\Http\Controllers\RuangBelajarController;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\RekomendasiController;
use App\Http\Controllers\TabelKontenController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AddSubmateriController;
use App\Http\Controllers\SubmateriController;
use App\Http\Controllers\SubMaterialController;
use App\Http\Controllers\RangkumanController;
use App\Http\Controllers\LatihanController;


Route::get('/latihan/{nama_submateri}', [LatihanController::class, 'index']);
Route::post('/latihan/{nama_submateri}', [LatihanController::class, 'store']);
Route::put('/latihan/{id}', [LatihanController::class, 'update']);
Route::delete('/latihan/{id}', [LatihanController::class, 'destroy']);

Route::post('/submateri/{nama_submateri}/rangkuman', [RangkumanController::class, 'store']);
Route::get('/rangkuman/all', [RangkumanController::class, 'getAllRangkuman']);
Route::get('/rangkuman/{id}/download', [RangkumanController::class, 'download'])->name('rangkuman.download');
Route::delete('/rangkuman/{id}', [RangkumanController::class, 'destroy']);

Route::get('/submaterial', [SubMaterialController::class, 'getSubMaterial']);

Route::get('/rangkuman/submateri', [RangkumanController::class, 'showBySubmateri']);
Route::get('/rangkuman/submateri/{nama_submateri?}', [RangkumanController::class, 'showBySubmateri']);
Route::get('/submateri', [SubmateriController::class, 'index']);


Route::get('user/getRoleDistribution', [UserController::class, 'getRoleDistribution']);

Route::post('/add-submateri', [AddSubmateriController::class, 'store']);
Route::get('/mata_pelajaran_jenjang/{jenjang_id}', [AddSubmateriController::class, 'getListMataPelajaran']);


Route::get('/dashboard-stats', [DashboardController::class, 'index']);


Route::get('/tabel-konten', [TabelKontenController::class, 'index']);
Route::get('tabel-konten/{id}', [TabelKontenController::class, 'show']);
Route::put('/tabel-konten/{id}', [TabelKontenController::class, 'update']);
Route::delete('/tabel-konten/{id}', [TabelKontenController::class, 'destroy']);


Route::get('/rekomendasi', [RekomendasiController::class, 'getRekomendasi']);
Route::get('/jumlah-konten', [KontenController::class, 'getJumlahKonten']);


// Rute untuk daftar konten
Route::get('/konten', [KontenController::class, 'index']);

// Rute untuk mata pelajaran berdasarkan jenjang
Route::get('/mata-pelajaran/{id_jenjang}', [MataPelajaranController::class, 'getMataPelajaranByJenjang']);

// Rute untuk daftar jenjang
Route::get('/jenjang', [JenjangController::class, 'index']);
Route::get('/jenjang/{id}', [JenjangController::class, 'show']);

// Rute untuk daftar user
Route::get('/users', [UserController::class, 'index']);


// Rute untuk mendapatkan user yang sedang login
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/mata-pelajaran', [MataPelajaranController::class, 'getAllMataPelajaran']);

