<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role')->get();

        return Inertia::render('Admin/PageUser', [
            'users' => $users,
        ]);
    }

    // (opsional) untuk chart
    public function getRoleDistribution()
    {
        $data = [
            ['name' => 'Orangtua', 'value' => User::where('role', 'orangtua')->count()],
            ['name' => 'Umum',     'value' => User::where('role', 'umum')->count()],
            ['name' => 'Siswa',    'value' => User::where('role', 'siswa')->count()],
            ['name' => 'Guru',     'value' => User::where('role', 'guru')->count()],
        ];

        return $data; // dipakai langsung sebagai props jika perlu
    }
}
