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
    // UserController.php
    public function getRoleDistribution()
    {
        // Hitung jumlah user berdasarkan role menggunakan query builder
        $roleCounts = [
            'orangtua' => User::where('role', 'orangtua')->count(),
            'umum' => User::where('role', 'umum')->count(),
            'siswa' => User::where('role', 'siswa')->count(),
            'guru' => User::where('role', 'guru')->count(),
        ];

        // Format data untuk chart
        $data = [];
        foreach ($roleCounts as $role => $count) {
            $data[] = [
                'name' => ucfirst($role),  // Menampilkan nama role dengan huruf kapital pertama
                'value' => $count,
            ];
        }

    return response()->json($data, 200);
}

   
}