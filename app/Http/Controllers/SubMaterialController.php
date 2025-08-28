<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubMaterialController extends Controller
{
    public function getSubmaterial(Request $request)
    {
        $nama_pelajaran = $request->query('nama_pelajaran');
        $nama_jenjang = $request->query('nama_jenjang');
        $nama_submateri = $request->query('nama_submateri');

        $query = DB::table('submateri')
            ->join('mata_pelajaran', 'submateri.id_mata_pelajaran', '=', 'mata_pelajaran.id')
            ->join('jenjang', 'submateri.id_jenjang', '=', 'jenjang.id') 
            ->leftJoin('konten', 'konten.id_submateri', '=', 'submateri.id')
            ->leftJoin('latihan', 'latihan.id_submateri', '=', 'submateri.id')
            ->leftJoin('rangkuman', 'rangkuman.id_submateri', '=', 'submateri.id')
            ->select(
                'submateri.nama_submateri',
                'mata_pelajaran.nama_pelajaran',
                'jenjang.nama_jenjang',
                'konten.id as konten_id',
                'konten.judul_konten',
                'konten.deskripsi',
                'konten.jenis_konten',
                'konten.thumbnail',
                'konten.link_konten',
                'latihan.id as latihan_id',
                'latihan.pertanyaan',
                'latihan.opsi_a',
                'latihan.opsi_b',
                'latihan.opsi_c',
                'latihan.opsi_d',
                'latihan.jawaban_benar',
                'rangkuman.id as rangkuman_id',
                'rangkuman.file_rangkuman'
            );

        // ✅ Filter berdasarkan nama, bukan ID
        if (!empty($nama_pelajaran)) {
            $query->where('mata_pelajaran.nama_pelajaran', urldecode($nama_pelajaran));
        }

        if (!empty($nama_jenjang)) {
            $query->where('jenjang.nama_jenjang', urldecode($nama_jenjang));
        }

        if (!empty($nama_submateri)) {
            $query->where('submateri.nama_submateri', urldecode($nama_submateri));
        }

        $result = $query->get();

        // ✅ Kelompokkan hasil berdasarkan nama_submateri
        $grouped = $result->groupBy('nama_submateri')->map(function ($items) {
            $first = $items->first();

            return [
                'nama_submateri' => $first->nama_submateri,
                'mata_pelajaran' => $first->nama_pelajaran,
                'jenjang' => $first->nama_jenjang,
                'konten' => $items->filter(fn($i) => $i->konten_id)->map(function ($i) {
                    return [
                        'id' => $i->konten_id,
                        'judul_konten' => $i->judul_konten,
                        'deskripsi' => $i->deskripsi,
                        'jenis_konten' => $i->jenis_konten,
                        'thumbnail' => $i->thumbnail,
                        'link_konten' => $i->link_konten,
                    ];
                })->values(),
                'latihan_soal' => $items->filter(fn($i) => $i->latihan_id)->map(function ($i) {
                    return [
                        'id' => $i->latihan_id,
                        'pertanyaan' => $i->pertanyaan,
                        'opsi_a' => $i->opsi_a,
                        'opsi_b' => $i->opsi_b,
                        'opsi_c' => $i->opsi_c,
                        'opsi_d' => $i->opsi_d,
                        'jawaban_benar' => $i->jawaban_benar,
                    ];
                })->values(),
                'rangkuman' => $items->filter(fn($i) => $i->rangkuman_id)->map(function ($i) {
                    return [
                        'id' => $i->rangkuman_id,
                        'file_rangkuman' => $i->file_rangkuman,
                    ];
                })->values(),
            ];
        })->values();

        return response()->json($grouped);
    }
}
