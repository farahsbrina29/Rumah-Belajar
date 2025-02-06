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
            'subMaterials' => $subMateri, // Ubah variabel agar sesuai dengan frontend
            'auth' => ['user' => Auth::user()],
        ]);
    }

    public function showSubMaterial($subject, $subject2)
    {
        // Panggil SubMaterialController untuk mengambil submateri berdasarkan subject
        $controller = new SubMaterialController();
        return $controller->showBySubject($subject, $subject2);
    }
}


