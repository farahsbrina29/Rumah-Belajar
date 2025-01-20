<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
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
        $admin = Auth::guard('admin')->user(); // Mendapatkan data admin yang sedang login
        return Inertia::render('Admin/DashboardAdmin', [
            'admin' => $admin, // Mengirim data admin ke view
        ]); // Pastikan file ini ada di resources/js/Pages/Admin/DashboardAdmin.vue
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

    // Menampilkan profil admin
    public function showProfile()
    {
        $admin = Auth::guard('admin')->user(); // Mendapatkan data admin yang sedang login
        if (!$admin) {
            abort(403, 'Admin not logged in.');
        }

        return Inertia::render('Admin/Profile', [
            'admin' => $admin, // Mengirim data admin ke view
        ]); // Pastikan file ini ada di resources/js/Pages/Admin/Profile.vue
    }

    // Memperbarui kata sandi admin
    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $admin = Auth::guard('admin')->user();

        // Verifikasi kata sandi saat ini
        if (!Hash::check($request->current_password, $admin->password)) {
            return back()->withErrors(['current_password' => 'Current password is incorrect.']);
        }

        // Perbarui kata sandi
        $admin->password = Hash::make($request->password);
        $admin->save();

        return back()->with('status', 'Password updated successfully.');
    }

    // Menampilkan data admin yang sedang login
    public function getAdminData()
    {
        $admin = Auth::guard('admin')->user();
        if (!$admin) {
            abort(403, 'Admin not logged in.');
        }

        return response()->json([
            'status' => 'success',
            'data' => $admin, // Mengembalikan data admin dalam bentuk JSON
        ]);
    }

}