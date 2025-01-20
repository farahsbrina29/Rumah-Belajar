<?php 

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RuangBelajarController;

// Rute untuk halaman ruang belajar
Route::get('/ruang-belajar/{subject}', function ($subject) {
    return Inertia::render('RuangBelajar', [
        'subject' => $subject,
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('ruang.belajar');

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

// Rute untuk halaman admin
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/ProfileAdmin', function () {
        return Inertia::render('Admin/ProfileAdmin');
    })->name('admin.profileadmin');

    Route::get('/admin/PageUser', function () {
        return Inertia::render('Admin/PageUser');
    })->name('admin.pageuser');

    Route::get('/admin/PageContent', function () {
        return Inertia::render('Admin/PageContent');
    })->name('admin.pagecontent');

    Route::get('/admin/profile', [AdminController::class, 'showProfile'])->name('admin.profile');
    Route::put('/admin/password', [AdminController::class, 'updatePassword'])->name('admin.password.update');
});

// Rute untuk login admin
Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.submit');

// Rute untuk dashboard admin
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
});

// File auth.php tambahan
require dirname(__FILE__).'/auth.php';
