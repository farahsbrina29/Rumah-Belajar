<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SubMaterialController extends Controller
{
    public function getSubmaterial(Request $request)
    {
        $idMataPelajaran = $request->query('id_mata_pelajaran');
        $idJenjang = $request->query('id_jenjang');
        $idSubMateri = $request->query('id_submateri');

        $query = DB::table('submateri')
            ->join('mata_pelajaran', 'submateri.id_mata_pelajaran', '=', 'mata_pelajaran.id')
            ->join('jenjang', 'mata_pelajaran.id_jenjang', '=', 'jenjang.id')
            ->leftJoin('konten', 'konten.id_submateri', '=', 'submateri.id')
            ->leftJoin('latihan', 'latihan.id_submateri', '=', 'submateri.id')
            ->leftJoin('rangkuman', 'rangkuman.id_submateri', '=', 'submateri.id')
            ->select(
                'submateri.id as id_submateri',
                'submateri.nama_submateri',
                'mata_pelajaran.id as id_mata_pelajaran',
                'mata_pelajaran.nama_pelajaran',
                'jenjang.id as id_jenjang',
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

        if (!empty($idMataPelajaran)) {
            $query->where('submateri.id_mata_pelajaran', $idMataPelajaran);
        }

        if (!empty($idJenjang)) {
            $query->where('mata_pelajaran.id_jenjang', $idJenjang);
        }

        if (!empty($idSubMateri)) {
            $query->where('submateri.id', $idSubMateri);
        }

        $result = $query->get();

        // Kelompokkan hasil berdasarkan submateri
        $grouped = $result->groupBy('id_submateri')->map(function ($items) {
            $first = $items->first();

            return [
                'id_submateri' => $first->id_submateri,
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
                        'link_konten' => $i->link_konten
                    ];
                })->values(),
                'latihan_soal' => $items->filter(fn($i) => $i->latihan_id)->map(function ($i) {
                    return [
                        'id' => $i->latihan_id,
                        'pertanyaan' => $i->pertanyaan,
                        'opsi' => [
                            'a' => $i->opsi_a,
                            'b' => $i->opsi_b,
                            'c' => $i->opsi_c,
                            'd' => $i->opsi_d
                        ],
                        'jawaban_benar' => $i->jawaban_benar
                    ];
                })->values(),
                'rangkuman' => $items->filter(fn($i) => $i->rangkuman_id)->map(function ($i) {
                    return [
                        'id' => $i->rangkuman_id,
                        'file_rangkuman' => $i->file_rangkuman
                    ];
                })->values()
            ];
        })->values();

        return response()->json($grouped);
    }
}
