<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Models\Submateri;
use App\Models\MataPelajaran;

class RuangBelajarController extends Controller
{
    public function index($subject)
    {
        // Cari mata pelajaran berdasarkan nama
        $mataPelajaran = MataPelajaran::where('nama_pelajaran', $subject)->firstOrFail();

        // Ambil submateri
        $subMaterials = Submateri::where('id_mata_pelajaran', $mataPelajaran->id)
            ->select('id', 'nama_submateri', 'slug')
            ->get();

        return Inertia::render('RuangBelajar', [
            'auth' => ['user' => Auth::user()],
            'subject' => $subject,
            'subMaterials' => $subMaterials
        ]);
    }
}