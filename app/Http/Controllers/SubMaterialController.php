<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Submateri;
use App\Models\Konten;
use App\Models\Latihan;
use App\Models\Rangkuman;

class SubmaterialController extends Controller
{
    public function show($subject, $materialSlug)
    {
        // Cari submateri berdasarkan slug, dan muat relasi konten, latihan, dan rangkuman
        $submateri = Submateri::with(['konten', 'latihan', 'rangkuman'])
            ->where('slug', $materialSlug)
            ->first();

        if (!$submateri) {
            abort(404); // Tampilkan error jika tidak ditemukan
        }

        // Menyiapkan data untuk dikirim ke Inertia
        $materialData = [
            'title' => $submateri->nama_submateri,
            'video_id' => $submateri->konten->first()->link_konten ?? 'default123', // Mengambil link_konten untuk video
            'description' => $submateri->konten->first()->deskripsi ?? 'Detail materi akan ditampilkan di sini...', // Mengambil deskripsi konten
            'exercises' => $submateri->latihan->map(function ($exercise) {
                return [
                    'id' => $exercise->id,
                    'question' => $exercise->pertanyaan,  // Mengambil pertanyaan latihan
                    'options' => [$exercise->opsi_a, $exercise->opsi_b, $exercise->opsi_c, $exercise->opsi_d], // Opsi soal latihan
                    'answer' => $exercise->jawaban_benar,  // Jawaban benar latihan
                ];
            }),
            'summary' => $submateri->rangkuman->first()->file_rangkuman ?? 'Rangkuman materi akan ditampilkan di sini...', // Mengambil file rangkuman
        ];

        // Kirim data ke Inertia
        return Inertia::render('SubMaterial', [
            'auth' => ['user' => Auth::user()],
            'subject'      => $subject,
            'materialSlug' => $materialSlug,
            'material'     => $materialData,
        ]);
    }
}


