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

}
