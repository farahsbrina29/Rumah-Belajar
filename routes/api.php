<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\MataPelajaranController;
use App\Http\Middleware\IsAdmin;use App\Http\Controllers\JenjangController;
use App\Http\Controllers\KontenController;
use App\Models\Submateri;
use Illuminate\Support\Facades\DB;

Route::get('/konten', [KontenController::class, 'index']);
Route::get('/mata-pelajaran/{id_jenjang}', [MataPelajaranController::class, 'getMataPelajaranByJenjang']);
Route::get('/jenjang/{id}', [JenjangController::class, 'show']);
Route::get('/jenjang', [JenjangController::class, 'index']);
Route::get('/users', [UserController::class, 'index']);

Route::get('/submateri', function (Request $request) {
    $query = DB::table('submateri')
        ->join('mata_pelajaran', 'submateri.id_mata_pelajaran', '=', 'mata_pelajaran.id')
        ->join('jenjang', 'mata_pelajaran.id_jenjang', '=', 'jenjang.id')
        ->select('submateri.id', 'submateri.nama_submateri', 'mata_pelajaran.nama_pelajaran', 'jenjang.nama_jenjang', 'jenjang.id as id_jenjang');

    // Jika ada filter jenjang, tambahkan kondisi WHERE
    if ($request->has('id_jenjang')) {
        $query->where('jenjang.id', $request->id_jenjang);
    }

    return response()->json($query->get());
});

// API untuk mendapatkan daftar jenjang
Route::get('/jenjang', function () {
    return response()->json(DB::table('jenjang')->select('id', 'nama_jenjang')->get());
});

// Rute untuk mendapatkan data user yang terautentikasi
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
