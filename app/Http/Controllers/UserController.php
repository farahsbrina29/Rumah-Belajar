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
    public function destroy($id)
    {
        try {
            // Cek apakah yang menghapus adalah admin
            if (auth()->user()->role !== 'admin') {
                return response()->json(['message' => 'Unauthorized'], 403);
            }

            $user = User::findOrFail($id); // Cari user berdasarkan ID
            $user->delete(); // Hapus user
            return response()->json(['message' => 'User deleted successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User not found or server error'], 500);
        }
    }

}