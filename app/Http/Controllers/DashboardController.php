<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\User;
use App\Models\Konten;
use App\Models\Rangkuman;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Statistik kartu
        $stats = [
            'userCount'      => User::count(),
            'kontenCount'    => Konten::count(),
            'rangkumanCount' => Rangkuman::count(),
        ];

        // Chart role user
        $roleDistribution = [
            ['name' => 'Orangtua', 'value' => User::where('role', 'orangtua')->count()],
            ['name' => 'Umum',     'value' => User::where('role', 'umum')->count()],
            ['name' => 'Siswa',    'value' => User::where('role', 'siswa')->count()],
            ['name' => 'Guru',     'value' => User::where('role', 'guru')->count()],
        ];

        // Chart jumlah konten per jenjang
        $jumlahKonten = DB::table('konten')
            ->join('jenjang', 'konten.id_jenjang', '=', 'jenjang.id')
            ->select('jenjang.nama_jenjang', DB::raw('COUNT(konten.id) as jumlah'))
            ->groupBy('jenjang.nama_jenjang')
            ->get();

        return Inertia::render('Admin/DashboardAdmin', [
            'stats'            => $stats,
            'roleDistribution' => $roleDistribution,
            'jumlahKonten'     => $jumlahKonten,
        ]);
    }
}
