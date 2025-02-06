<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\SubMateri;
use Illuminate\Support\Facades\Auth;

class SubMaterialController extends Controller
{
    // Menampilkan materi berdasarkan subject dan submateri
    public function showBySubject($subject, $subject2)
    {
        $subMateri = SubMateri::whereHas('mataPelajaran', function ($query) use ($subject) {
            $query->where('nama_pelajaran', $subject);
        })->where('nama_submateri', $subject2)->first();

        if ($subMateri) {
            return Inertia::render('SubMaterial', [
                'subject' => $subject,
                'material' => [
                    'title' => $subMateri->nama_submateri,
                    'video_id' => optional($subMateri->konten)->link_konten,
                    'description' => optional($subMateri->konten)->deskripsi ?? 'Materi belum tersedia',
                    'exercises' => $subMateri->latihan ? $subMateri->latihan->map(function ($exercise) {
                        return [
                            'id' => $exercise->id,
                            'question' => $exercise->pertanyaan,
                            'options' => [
                                $exercise->opsi_a,
                                $exercise->opsi_b,
                                $exercise->opsi_c,
                                $exercise->opsi_d
                            ],
                            'answer' => $exercise->jawaban_benar,
                        ];
                    }) : [],
                    'summary' => optional($subMateri->rangkuman)->file_rangkuman ?? 'Rangkuman belum tersedia',
                ]
            ]);
        }

        // Jika submateri tidak ditemukan, tampilkan halaman error
        return Inertia::render('ErrorPage', [
            'message' => 'Submateri tidak ditemukan',
        ]);
    }
}

