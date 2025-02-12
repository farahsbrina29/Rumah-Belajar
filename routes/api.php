<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MataPelajaranController;
use App\Http\Controllers\JenjangController;
use App\Http\Controllers\KontenController;
use App\Http\Controllers\RuangBelajarController;
use App\Http\Controllers\SubMaterialController;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\RekomendasiController;
use App\Http\Controllers\TabelKontenController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AddSubmateriController;

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/add-submateri', [AddSubmateriController::class, 'store']);
});
Route::get('/mata_pelajaran_jenjang/{jenjang_id}', [AddSubmateriController::class, 'getListMataPelajaran']);


Route::get('/dashboard-stats', [DashboardController::class, 'index']);


Route::get('/tabel-konten', [TabelKontenController::class, 'index']);
Route::get('tabel-konten/{id}', [TabelKontenController::class, 'show']);
Route::put('/tabel-konten/{id}', [TabelKontenController::class, 'update']);
Route::delete('/tabel-konten/{id}', [TabelKontenController::class, 'destroy']);


Route::get('/rekomendasi', [RekomendasiController::class, 'getRekomendasi']);
Route::get('/jumlah-konten', [KontenController::class, 'getJumlahKonten']);

// Rute untuk submateri berdasarkan subject dan subject2
Route::get('/submateri/{subject}/{subject2}', [SubMaterialController::class, 'show'])->name('submateri.show');

// Rute untuk daftar konten
Route::get('/konten', [KontenController::class, 'index']);

// Rute untuk mata pelajaran berdasarkan jenjang
Route::get('/mata-pelajaran/{id_jenjang}', [MataPelajaranController::class, 'getMataPelajaranByJenjang']);

// Rute untuk daftar jenjang
Route::get('/jenjang', [JenjangController::class, 'index']);
Route::get('/jenjang/{id}', [JenjangController::class, 'show']);

// Rute untuk daftar user
Route::get('/users', [UserController::class, 'index']);

// API untuk mendapatkan daftar submateri dengan filter jenjang (jika ada)
Route::get('/submateri', function (Request $request) {
    $query = DB::table('submateri')
        ->join('mata_pelajaran', 'submateri.id_mata_pelajaran', '=', 'mata_pelajaran.id')
        ->join('jenjang', 'mata_pelajaran.id_jenjang', '=', 'jenjang.id')
        ->select(
            'submateri.id',
            'submateri.nama_submateri',
            'mata_pelajaran.nama_pelajaran',
            'jenjang.nama_jenjang',
            'jenjang.id as id_jenjang'
        );

    if ($request->has('id_jenjang')) {
        $query->where('jenjang.id', $request->id_jenjang);
    }

    return response()->json($query->get());
});

// Rute untuk mendapatkan user yang sedang login
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/mata-pelajaran', [MataPelajaranController::class, 'getAllMataPelajaran']);

