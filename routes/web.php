<?php 

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia; 
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\RuangBelajarController;
use App\Http\Controllers\SubMaterialController;
use App\Http\Controllers\AddSubmateriController;
use App\Http\Controllers\RangkumanController;
use App\Http\Controllers\LatihanController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TabelKontenController;
use App\Http\Controllers\KontenController;
use App\Http\Controllers\MataPelajaranController;
use App\Http\Controllers\JenjangController;
use App\Http\Controllers\RekomendasiController;
use App\Http\Controllers\SubmateriController;
use Illuminate\Support\Facades\Auth;




// Rute untuk dashboard pengguna
Route::get('/dashboard', function () {
    return Inertia::render('user/Dashboard');
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
    return Inertia::render('user/Konten', [
        'canLogin' => Route::has('login'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('konten');


Route::middleware(['auth'])->group(function () {

    Route::get('/rangkuman', [RangkumanController::class, 'listUserPage'])
        ->name('rangkuman.index');

    // DETAIL RANGKUMAN (slug submateri)
    Route::get('/rangkuman/{nama_submateri}', [RangkumanController::class, 'detailUserPage'])
        ->name('rangkuman.detail');

});

Route::middleware('auth')->prefix('api')->group(function () {
    Route::get('/submaterial', [SubMaterialController::class, 'getSubMaterial']);
    Route::get('/submateri', [SubmateriController::class, 'index']);
    });

Route::middleware(['auth'])->group(function () {

    Route::get('/ruang-belajar/{nama_pelajaran}/{nama_jenjang}', function ($nama_pelajaran, $nama_jenjang) {
        return Inertia::render('user/RuangBelajar', [
            'nama_pelajaran' => $nama_pelajaran,
            'nama_jenjang' => $nama_jenjang
        ]);
    })->name('ruang-belajar');

    Route::get('/konten/{nama_pelajaran}/{nama_jenjang}/{nama_submateri}', function ($nama_pelajaran, $nama_jenjang, $nama_submateri) {
        return Inertia::render('user/submaterial', [
            'nama_pelajaran' => $nama_pelajaran,
            'nama_jenjang' => $nama_jenjang,
            'nama_submateri' => $nama_submateri
        ]);
    })->name('submaterial');

});
 
Route::prefix('api')->group(function () {
    Route::get('/jenjangg', [JenjangController::class, 'index']);
    Route::get('/mata-pelajaran/{id_jenjang}', [MataPelajaranController::class, 'getMataPelajaranByJenjang']);
    Route::get('/mata-pelajaran', [MataPelajaranController::class, 'getAllMataPelajaran']);
    Route::get('/rekomendasi', [RekomendasiController::class, 'getRekomendasi']);
    Route::get('/jumlah-konten', [KontenController::class, 'jumlahKonten']);
});

// ADMIN AUTH

// Rute login untuk admin
Route::get('/admin/login', [AdminController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AdminController::class, 'login'])->name('admin.login.submit');

Route::middleware(['auth:admin'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/panel', [DashboardController::class, 'index'])
            ->name('admin.dashboard');

    });

Route::middleware(['auth:admin'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/pengguna', [UserController::class, 'index'])
            ->name('admin.users.index');

    });

Route::middleware(['auth:admin'])
    ->prefix('admin')
    ->group(function () {

        Route::post('/add-submateri', [AddSubmateriController::class, 'store'])
            ->name('admin.submateri.store');

        Route::get(
            '/mata-pelajaran-jenjang/{jenjang_id}',
            [AddSubmateriController::class, 'getListMataPelajaran']
        )->name('admin.mata-pelajaran.by-jenjang');
    });


Route::middleware(['auth:admin'])
    ->prefix('admin')
    ->group(function () {

        Route::get('/tabel-konten', [TabelKontenController::class, 'index']);
        Route::get('/tabel-konten/{id}', [TabelKontenController::class, 'show']);

        Route::put('/tabel-konten/{id}', [TabelKontenController::class, 'update']);

        Route::delete('/tabel-konten/{id}', [TabelKontenController::class, 'destroy']);
});


Route::middleware(['auth:admin'])->group(function () {


    // Ambil mata pelajaran berdasarkan jenjang
    Route::get(
        '/mata_pelajaran_jenjang/{jenjang_id}',
        [AddSubmateriController::class, 'getListMataPelajaran']
    );

      // Ambil list jenjang
    Route::get('/jenjang', function () {
        return \App\Models\Jenjang::all();
    });

    // Simpan submateri + konten
    Route::post(
        '/add-submateri',
        [AddSubmateriController::class, 'store']
    );

});

Route::middleware(['auth:admin'])
    ->prefix('admin')
    ->group(function () {
        
        Route::get(
            '/konten/{nama_submateri}/rangkuman',
            [RangkumanController::class, 'showAdminPage']
        )->name('admin.rangkuman.index');


        Route::post(
            '/rangkuman/{nama_submateri}',
            [RangkumanController::class, 'store']
        )->name('admin.rangkuman.store');

        Route::delete(
            '/rangkuman/{id}',
            [RangkumanController::class, 'destroy']
        )->name('admin.rangkuman.destroy');

        Route::get(
            '/rangkuman/{id}/download',
            [RangkumanController::class, 'download']
        )->name('admin.rangkuman.download');
    });


Route::middleware(['auth:admin'])
    ->prefix('admin')
    ->group(function () {

        // halaman latihan
        Route::get(
            '/konten/{nama_submateri}/latihan',
            [LatihanController::class, 'showPage']
        )->name('admin.latihan.page');

        // simpan
        Route::post(
            '/latihan/{nama_submateri}',
            [LatihanController::class, 'store']
        )->name('admin.latihan.store');

        // update
        Route::put(
            '/latihan/{id}',
            [LatihanController::class, 'update']
        )->name('admin.latihan.update');

        // delete
        Route::delete(
            '/latihan/{id}',
            [LatihanController::class, 'destroy']
        )->name('admin.latihan.destroy');
    });

Route::middleware(['auth:admin'])->group(function () {
    Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
    Route::get('/admin/profil', [AdminController::class, 'profileAdmin'])->name('admin.profileadmin');
    Route::get('/admin/konten', [AdminController::class, 'pageContent'])->name('admin.pagecontent');
    Route::put('/admin/password', [AdminController::class, 'updatePassword'])->name('admin.password.update');
});

require __DIR__.'/auth.php';
