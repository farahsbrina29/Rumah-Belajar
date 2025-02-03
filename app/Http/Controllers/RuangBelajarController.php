<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\SubMateri;

class RuangBelajarController extends Controller
{
    public function index($subject)
    {
        // Ambil submateri berdasarkan subject
        $subMateri = SubMateri::whereHas('mataPelajaran', function ($query) use ($subject) {
            $query->where('nama_pelajaran', $subject);
        })->get();

        return Inertia::render('RuangBelajar', [
            'subject' => $subject,
            'subMaterials' => $subMateri, // Pastikan konsisten dengan frontend
            'auth' => ['user' => Auth::user()],
        ]);
    }

    public function showSubMaterial($subject, $materialId) // Ganti parameter slug dengan materialId
    {
        // Normalisasi subject agar selalu lowercase seperti di frontend
        $subject = strtolower($subject);

        // Cari submateri berdasarkan materialId
        $subMateri = SubMateri::findOrFail($materialId); // Menggunakan findOrFail untuk mencari berdasarkan ID

        return Inertia::render('SubMateri', [
            'auth' => auth()->user(),
            'subject' => ucfirst($subject), // Untuk tampilan, tetap huruf besar di awal
            'materialId' => $materialId, // Ganti materialSlug dengan materialId
            'subMateri' => $subMateri // Sesuai dengan model yang benar
        ]);
    }
}

