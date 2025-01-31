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

   
}