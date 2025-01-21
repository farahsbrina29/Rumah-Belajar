<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Method untuk mengambil data users
    public function index()
    {
        // Ambil kolom id, name, email, dan role dari tabel users
        $users = User::select('id', 'name', 'email', 'role')->get();
        return response()->json($users, 200);
    }

    // Method untuk menghapus user secara permanen
   // Di controller backend, pastikan rute DELETE ini dapat menangani dengan benar
    public function destroyPermanently($id)
    {
        try {
            $user = User::withTrashed()->findOrFail($id);
            $user->forceDelete();
            return response()->json(['message' => 'User permanently deleted.'], 200);
        } catch (\Exception $e) {
            // Menangani error secara lebih spesifik
            return response()->json(['message' => 'Failed to delete user.', 'error' => $e->getMessage()], 500);
        }
    }
}