<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AdminController extends Controller
{
    // Menampilkan halaman login
    public function showLogin()
    {
        return Inertia::render('Admin/Login'); // Pastikan file ini ada di resources/js/Pages/Admin/Login.vue
    }

    // Proses login admin
    public function login(Request $request)
    {
        // Validasi kredensial login
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Cek apakah kredensial valid dengan guard 'admin'
        if (Auth::guard('admin')->attempt($credentials)) {
            // Mengatur ulang session setelah login berhasil
            $request->session()->regenerate();
            
            // Redirect ke halaman dashboard admin setelah login sukses
            return redirect()->route('admin.dashboard');
        }

        // Jika kredensial tidak valid, kembalikan ke halaman login dengan error
        return back()->withErrors([
            'email' => 'Invalid credentials.',
        ]);
    }

    // Menampilkan dashboard admin
    public function dashboard()
    {
        return Inertia::render('Admin/DashboardAdmin'); // Pastikan file ini ada di resources/js/Pages/Admin/DashboardAdmin.vue
    }

    // Logout admin
    public function logout(Request $request)
    {
        // Logout admin
        Auth::guard('admin')->logout();
        // Invalidate session dan regenerasi token CSRF
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        // Redirect kembali ke halaman login setelah logout
        return redirect('/admin/login');
    }
}


