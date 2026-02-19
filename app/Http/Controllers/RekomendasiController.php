<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RekomendasiController extends Controller
{
    public function getRekomendasi(Request $request)
    {
        $idJenjang = $request->query('idJenjang');
        $limit = $request->query('limit', 3);

        $query = DB::table('konten')
            ->join('mata_pelajaran', 'konten.id_mata_pelajaran', '=', 'mata_pelajaran.id')
            ->join('jenjang', 'konten.id_jenjang', '=', 'jenjang.id')
            ->join('submateri', 'konten.id_submateri', '=', 'submateri.id') // ✅ JOIN TAMBAHAN
            ->select(
                'konten.judul_konten',
                'konten.thumbnail',
                'mata_pelajaran.nama_pelajaran',
                'jenjang.nama_jenjang',
                'submateri.nama_submateri' // ✅ TAMBAHKAN INI
            );

        if ($idJenjang) {
            $query->where('jenjang.id', $idJenjang);
        }

        $rekomendasi = $query
            ->inRandomOrder()
            ->limit($limit)
            ->get();

        $rekomendasi = $rekomendasi->map(function ($item) {
            if ($item->thumbnail) {
                $item->thumbnail = asset('storage/' . str_replace('public/', '', $item->thumbnail));
            }
            return $item;
        });

        return response()->json($rekomendasi);
    }
}
