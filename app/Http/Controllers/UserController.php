<?php

namespace App\Http\Controllers;

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        // Ambil kolom name, email, dan role dari tabel users
        $users = User::select('name', 'email', 'role')->get();
        return response()->json($users);
    }

    // Metode untuk menghapus user secara permanen berdasarkan ID
    public function destroyPermanently($id)
    {
        // Cari user berdasarkan ID, termasuk yang sudah dihapus (soft deleted)
        $user = User::withTrashed()->findOrFail($id);

        // Hapus user secara permanen dari database
        $user->forceDelete();

        // Kembalikan response bahwa user berhasil dihapus secara permanen
        return response()->json(['message' => 'User permanently deleted.'], 200);
    }
}
