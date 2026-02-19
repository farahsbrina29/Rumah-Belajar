<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use App\Models\Konten;

class KontenController extends Controller
{
    public function jumlahKonten()
        {
            $jumlahKonten = DB::table('konten')
                ->join('jenjang', 'konten.id_jenjang', '=', 'jenjang.id')
                ->select('jenjang.nama_jenjang', DB::raw('COUNT(konten.id) as jumlah'))
                ->groupBy('jenjang.nama_jenjang')
                ->get();

            return response()->json($jumlahKonten);
        }
}
