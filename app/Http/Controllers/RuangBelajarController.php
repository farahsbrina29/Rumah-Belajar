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
        $subMaterials = SubMateri::whereHas('mataPelajaran', function ($query) use ($subject) {
            $query->where('nama_pelajaran', $subject);
        })->get();

        return Inertia::render('RuangBelajar', [
            'subject' => $subject,
            'subMaterials' => $subMaterials,
            'auth' => ['user' => Auth::user()],
        ]);
    }

    public function showSubMaterial($subject, $materialId) // Menggunakan ID sebagai parameter
    {
        // Cari submateri berdasarkan ID, bukan slug
        $subMaterial = SubMateri::findOrFail($materialId); // Menggunakan findOrFail untuk ID

        return Inertia::render('SubMaterial', [
            'subject' => $subject,
            'subMaterial' => $subMaterial,
            'auth' => ['user' => Auth::user()],
        ]);
    }
}
