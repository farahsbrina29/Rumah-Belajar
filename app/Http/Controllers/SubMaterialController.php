<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submateri;
use App\Models\Konten;
use App\Models\Latihan;
use App\Models\Rangkuman;

class SubMaterialController extends Controller
{
    public function getSubmaterial($idMataPelajaran, $idJenjang, $idSubMateri)
    {
        $submateri = Submateri::where('id_mata_pelajaran', $idMataPelajaran)
            ->where('id_jenjang', $idJenjang)
            ->where('id', $idSubMateri)
            ->first();

        if (!$submateri) {
            return response()->json(['message' => 'Submateri tidak ditemukan'], 404);
        }

        // Mengambil data konten yang berkaitan dengan submateri
        $konten = Konten::where('id_submateri', $idSubMateri)->get();
        
        // Mengambil data latihan soal yang berkaitan dengan submateri
        $latihan = Latihan::where('id_submateri', $idSubMateri)->get();
        
        // Mengambil data rangkuman yang berkaitan dengan submateri
        $rangkuman = Rangkuman::where('id_submateri', $idSubMateri)->get();

        return response()->json([
            'nama_submateri' => $submateri->nama_submateri,
            'konten' => $konten->map(function ($item) {
                return [
                    'id' => $item->id,
                    'judul_konten' => $item->judul_konten,
                    'deskripsi' => $item->deskripsi,
                    'jenis_konten' => $item->jenis_konten,
                    'thumbnail' => $item->thumbnail,
                    'link_konten' => $item->link_konten
                ];
            }),
            'latihan_soal' => $latihan->map(function ($soal) {
                return [
                    'id' => $soal->id,
                    'pertanyaan' => $soal->pertanyaan,
                    'opsi' => [
                        'a' => $soal->opsi_a,
                        'b' => $soal->opsi_b,
                        'c' => $soal->opsi_c,
                        'd' => $soal->opsi_d
                    ],
                    'jawaban_benar' => $soal->jawaban_benar
                ];
            }),
            'rangkuman' => $rangkuman->map(function ($file) {
                return [
                    'id' => $file->id,
                    'file_rangkuman' => $file->file_rangkuman
                ];
            })
        ]);
    }
}