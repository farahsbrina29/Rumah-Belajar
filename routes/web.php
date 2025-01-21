<?php 

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia; 
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\RuangBelajarController;
use Illuminate\Support\Facades\Auth;

// Route ruang belajar dan submateri
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/ruang-belajar/{subject}', function ($subject) {
        return Inertia::render('RuangBelajar', [
            'subject' => $subject,
            'auth' => ['user' => Auth::user()],
        ]);
    })->name('ruang.belajar');

    Route::get('/belajar/{subject}/{materialSlug}', function ($subject, $materialSlug) {
        return Inertia::render('SubMaterial', [
            'subject' => $subject,
            'materialSlug' => $materialSlug,
            'auth' => ['user' => Auth::user()],
        ]);
    })->name('sub.material');
});

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

// Rute login untuk admin
Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.submit');

// Rute yang dilindungi dengan middleware 'auth:admin' untuk admin yang sudah login
// Rute login admin - di luar middleware
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

// Rute login admin - tetap di luar middleware
Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.submit');

require __DIR__.'/auth.php';
