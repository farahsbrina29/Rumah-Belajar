<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubmateriController extends Controller
{
    public function index(Request $request)
    {
        $query = DB::table('mata_pelajaran')
            ->leftJoin('submateri', 'submateri.id_mata_pelajaran', '=', 'mata_pelajaran.id')
            ->join('jenjang', 'mata_pelajaran.id_jenjang', '=', 'jenjang.id')
            ->select(
                'mata_pelajaran.id as id_mata_pelajaran',
                'mata_pelajaran.nama_pelajaran',
                'jenjang.nama_jenjang',
                'jenjang.id as id_jenjang',
                'submateri.id as id_submateri',
                'submateri.nama_submateri'
            );

        // Ambil parameter dari request (sekarang pakai nama, bukan id)
        $nama_pelajaran = $request->query('nama_pelajaran');
        $nama_jenjang = $request->query('nama_jenjang');

        // Tambahkan filter jika parameter ada
        if (!empty($nama_pelajaran)) {
            $query->where('mata_pelajaran.nama_pelajaran', $nama_pelajaran);
        }

        if (!empty($nama_jenjang)) {
            $query->where('jenjang.nama_jenjang', $nama_jenjang);
        }

        // Eksekusi query dan ambil data
        $result = $query->get();

        // **Filter hasil supaya hanya menampilkan submateri jika ada**
        $filteredResult = $result->map(function ($item) {
            if ($item->id_submateri === null) {
                $item->nama_submateri = null; // Tidak perlu tombol untuk submateri yang kosong
            }
            return $item;
        });

        return response()->json($filteredResult);
    }
}
