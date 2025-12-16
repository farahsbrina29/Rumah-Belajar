<?php 

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia; 
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RuangBelajarController;
use App\Http\Controllers\SubMaterialController;
use App\Http\Controllers\RangkumanController;
use App\Http\Controllers\LatihanController;
use Illuminate\Support\Facades\Auth;


Route::get('/ruang-belajar/{nama_pelajaran}/{nama_jenjang}', function ($nama_pelajaran, $nama_jenjang) {
    return Inertia::render('RuangBelajar', [
        'nama_pelajaran' => $nama_pelajaran,
        'nama_jenjang' => $nama_jenjang
    ]);
})->name('ruang-belajar');



Route::get('/konten/{nama_pelajaran}/{nama_jenjang}/{nama_submateri}', function ($nama_pelajaran, $nama_jenjang, $nama_submateri) {
    return Inertia::render('submaterial', [
        'nama_pelajaran' => $nama_pelajaran,
        'nama_jenjang' => $nama_jenjang,
        'nama_submateri' => $nama_submateri
    ]);
})->name('submaterial');

Route::get('/rangkuman/{nama_submateri}', function ($nama_submateri) {
    return Inertia::render('DetailRangkuman', [
        'nama_submateri' => $nama_submateri,
    ]);
});


// Di routes/web.php
// web.php
Route::get('/admin/konten/{nama_submateri}/rangkuman', [RangkumanController::class, 'showPage'])
    ->name('rangkuman.index');

// Rute untuk halaman beranda
Route::get('/', function () {
    return Inertia::render('user/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('beranda');

// Rute untuk halaman konten
Route::get('/konten', function () {
    return Inertia::render('Konten', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('konten');

// Rute untuk halaman rangkuman 
Route::get('/rangkuman', function () {
    return Inertia::render('Rangkuman', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('rangkuman');

Route::get('/admin/konten/{nama_submateri}/latihan', [LatihanController::class, 'showPage'])->name('latihan.showPage');



// Rute untuk dashboard pengguna
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Rute untuk pengelolaan profil pengguna
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rute untuk pendaftaran
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store'])->name('register.store');

// Rute login untuk admin
Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.submit');

// Semua route admin lainnya di dalam middleware
Route::middleware(['auth.check:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
});

Route::middleware(['auth:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
    
    // Halaman admin lainnya
    Route::get('/admin/profil', [AdminController::class, 'profileAdmin'])->name('admin.profileadmin');
    Route::get('/admin/pengguna', [AdminController::class, 'pageUser'])->name('admin.pageuser'); 
    Route::get('/admin/konten', [AdminController::class, 'pageContent'])->name('admin.pagecontent');
    
    Route::get('/admin/profile', [AdminController::class, 'showProfile'])->name('admin.profile');
    Route::put('/admin/password', [AdminController::class, 'updatePassword'])->name('admin.password.update');
});

require __DIR__.'/auth.php';
