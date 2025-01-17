<?php 

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AdminController; // Tambahkan controller untuk admin
use App\Http\Controllers\RuangBelajarController;

Route::get('/ruang-belajar/{subject}', function ($subject) {
    return Inertia::render('RuangBelajar', [
        'subject' => $subject,
        'auth' => [
            'user' => Auth::user(),
        ],
    ]);
})->middleware(['auth', 'verified'])->name('ruang.belajar');

Route::get('/', function () {
    return Inertia::render('user/Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('beranda');

Route::get('/konten', function () {
    return Inertia::render('Konten', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('konten');

Route::get('/rangkuman', function () {
    return Inertia::render('Rangkuman', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('rangkuman');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Rute untuk pendaftaran
Route::get('/register', [RegisteredUserController::class, 'create'])->name('register');
Route::post('/register', [RegisteredUserController::class, 'store'])->name('register.store');

// Rute untuk halaman pengguna dan konten
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/PageUser', function () {
        return Inertia::render('Admin/PageUser'); // Pastikan path ke view inertia benar
    })->name('admin.pageuser');

    Route::get('/admin/PageContent', function () {
        return Inertia::render('Admin/PageContent'); // Pastikan path ke view inertia benar
    })->name('admin.pagecontent');
});


// Rute untuk login admin
Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.submit');

// Rute untuk dashboard admin
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'dashboard'])->name('admin.dashboard');
    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
});

require dirname(__FILE__).'/auth.php';
