<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:admin')->except(['showLogin', 'login']);
    }

    public function showLogin()
    {
        return Inertia::render('Admin/Login');
    }

   public function login(Request $request)
{
    $credentials = $request->validate([
        'email' => 'required|email',
        'password' => 'required',
    ]);

    if (Auth::guard('admin')->attempt($credentials)) {
        $request->session()->regenerate();

        return response()->json([
            'status' => 'success',
            'message' => 'Login berhasil',
        ], 200);
    }

    return response()->json([
        'status' => 'error',
        'message' => 'Email atau password salah',
    ], 401);
}


    public function dashboard()
    {
        $admin = Auth::guard('admin')->user();

        if (!$admin) {
            return redirect()->route('admin.login');
        }

        return Inertia::render('Admin/DashboardAdmin', [
            'admin' => $admin,
        ]);
    }

    public function logout(Request $request)
    {
        Auth::guard('admin')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/admin/login');
    }

   

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => 'required',
            'password' => 'required|min:8|confirmed',
        ]);

        $admin = Auth::guard('admin')->user();

        if (!Hash::check($request->current_password, $admin->password)) {
            return back()->withErrors(['current_password' => 'Current password is incorrect.']);
        }

        $admin->password = Hash::make($request->password);
        $admin->save();

        return back()->with('status', 'Password updated successfully.');
    }

    public function getAdminData()
    {
        $admin = Auth::guard('admin')->user();
        if (!$admin) {
            abort(403, 'Admin not logged in.');
        }

        return response()->json([
            'status' => 'success',
            'data' => $admin,
        ]);
    }

    // Menambahkan 3 method baru
    public function profileAdmin()
    {
        return Inertia::render('Admin/ProfileAdmin', [
            'auth' => [
                'user' => Auth::guard('admin')->user()
            ]
        ]);
    }

    public function pageUser()
    {
        if (!Auth::guard('admin')->check()) {
            return redirect()->route('admin.login');
        }
        return Inertia::render('Admin/PageUser');
    }

    public function pageContent()
    {
        if (!Auth::guard('admin')->check()) {
            return redirect()->route('admin.login');
        }
        return Inertia::render('Admin/PageContent');
    }
    }