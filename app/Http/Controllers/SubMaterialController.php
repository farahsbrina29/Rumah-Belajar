<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Submateri;

class SubMaterialController extends Controller
{
    public function show($subject, $materialSlug)
    {
        // Tambahkan logging untuk debug
        \Log::info('Mencoba mengakses submateri', [
            'subject' => $subject,
            'slug' => $materialSlug
        ]);

        $submateri = Submateri::where('slug', $materialSlug)
            ->with(['konten', 'latihan', 'rangkuman'])
            ->firstOrFail();

        $materialData = [
            'id' => $submateri->id,
            'title' => $submateri->nama_submateri,
            'video_id' => optional($submateri->konten)->link_konten,
            'description' => optional($submateri->konten)->deskripsi ?? 'Materi belum tersedia',
            'exercises' => $submateri->latihan ? $submateri->latihan->map(function ($exercise) {
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
            'summary' => optional($submateri->rangkuman)->file_rangkuman ?? 'Rangkuman belum tersedia'
        ];

        return Inertia::render('SubMaterial', [
            'auth' => ['user' => Auth::user()],
            'subject' => $subject,
            'materialSlug' => $materialSlug,
            'material' => $materialData
        ]);
    }
}