<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RekomendasiController extends Controller
{
    public function getRekomendasi(Request $request)
    {
        $idJenjang = $request->query('idJenjang');

        $query = DB::table('konten')
            ->join('mata_pelajaran', 'konten.id_mata_pelajaran', '=', 'mata_pelajaran.id')
            ->join('jenjang', 'konten.id_jenjang', '=', 'jenjang.id')
            ->select(
                'konten.judul_konten',
                'konten.thumbnail',
                'mata_pelajaran.nama_pelajaran',
                'jenjang.nama_jenjang',
                'jenjang.id as id_jenjang' // Sertakan id_jenjang untuk filtering
            );

        if ($idJenjang) {
            $query->where('jenjang.id', $idJenjang);
        }

        $rekomendasi = $query->limit(4)->get();

        // Pastikan thumbnail dalam format yang bisa diakses frontend
        $rekomendasi = $rekomendasi->map(function ($item) {
            if ($item->thumbnail) {
                $item->thumbnail = asset('storage/' . str_replace('public/', '', $item->thumbnail));
            }
            return $item;
        });

        return response()->json($rekomendasi);
    }
}
