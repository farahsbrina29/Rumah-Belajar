<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rangkuman; 
use App\Models\Konten; // Pastikan model ini sesuai dengan nama model tabel konten

class DashboardController extends Controller
{
    public function index()
    {
        // Hitung jumlah total pengguna
        $userCount = User::count();

        // Hitung jumlah total konten
        $kontenCount = Konten::count();

     // Hitung jumlah total konten
     $rangkumanCount = Rangkuman::count();

        return response()->json([
            'userCount'      => $userCount,
            'kontenCount'    => $kontenCount,
            'rangkumanCount' => $rangkumanCount,
        ]);
    }
}

