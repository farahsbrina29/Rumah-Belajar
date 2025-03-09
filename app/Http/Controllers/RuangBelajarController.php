<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\SubMateri;

class RuangBelajarController extends Controller
{
    public function index($idMataPelajaran, $idJenjang)
    {
        return Inertia::render('RuangBelajar', [
            'idMataPelajaran' => $idMataPelajaran,
            'idJenjang' => $idJenjang,
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


