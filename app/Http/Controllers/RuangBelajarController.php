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
            'subMaterials' => $subMateri,
            'auth' => ['user' => Auth::user()],
        ]);
    }


    public function showSubMaterial($subject, $slug)
    {
        $subMateri = SubMateri::where('slug', $slug)->with('konten', 'latihan')->firstOrFail();
    
        return Inertia::render('SubMaterial', [
            'auth' => auth()->user(),
            'subject' => ucfirst($subject),
            'subMateri' => $subMateri
        ]);
    }
    
}

