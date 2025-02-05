<?php 

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia; 
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RuangBelajarController;
use App\Http\Controllers\SubMaterialController;
use Illuminate\Support\Facades\Auth;

// Middleware untuk user yang sudah login
Route::middleware(['auth', 'verified'])->group(function () {
    // Route untuk daftar submateri
    Route::get('/ruang-belajar/{subject}', [RuangBelajarController::class, 'index'])
        ->name('ruang-belajar.index');

    // Route untuk detail submateri
    Route::get('/ruang-belajar/{subject}/{materialSlug}', [SubMaterialController::class, 'show'])
        ->name('submaterial.show');

    // Rute untuk halaman konten (hanya user yang login)
    Route::get('/konten', function () {
        return Inertia::render('Konten');
    })->name('konten');

    // Rute untuk halaman rangkuman (hanya user yang login)
    Route::get('/rangkuman', function () {
        return Inertia::render('Rangkuman');
    })->name('rangkuman');
});

// Rute untuk halaman beranda (tanpa login)
Route::get('/', function () {
    return Inertia::render('user/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('beranda');

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
Route::middleware(['auth:admin'])->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');

    // Halaman admin lainnya
    Route::get('/admin/ProfileAdmin', [AdminController::class, 'profileAdmin'])->name('admin.profileadmin');
    Route::get('/admin/PageUser', [AdminController::class, 'pageUser'])->name('admin.pageuser'); 
    Route::get('/admin/PageContent', [AdminController::class, 'pageContent'])->name('admin.pagecontent');

    Route::get('/admin/profile', [AdminController::class, 'showProfile'])->name('admin.profile');
    Route::put('/admin/password', [AdminController::class, 'updatePassword'])->name('admin.password.update');
});

require __DIR__.'/auth.php';
