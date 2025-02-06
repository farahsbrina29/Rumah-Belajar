<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RekomendasiController extends Controller
{
    public function getRekomendasi()
    {
        $rekomendasi = DB::table('konten')
            ->join('mata_pelajaran', 'konten.id_mata_pelajaran', '=', 'mata_pelajaran.id')
            ->join('jenjang', 'konten.id_jenjang', '=', 'jenjang.id')
            ->select('konten.judul_konten', 'konten.thumbnail', 'mata_pelajaran.nama_pelajaran', 'jenjang.nama_jenjang')
            ->limit(4)
            ->get();

        return response()->json($rekomendasi);
    }
}
