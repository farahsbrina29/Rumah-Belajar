<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Submateri; // Menggunakan model Submateri

class SubmaterialController extends Controller
{
    public function show($subject, $materialSlug)
    {
        // Cari submateri berdasarkan slug
        $submateri = Submateri::where('slug', $materialSlug)->first();

        if (!$submateri) {
            abort(404); // Tampilkan error jika tidak ditemukan
        }

        return Inertia::render('Submateri', [
            'auth'         => auth()->user(),
            'subject'      => $subject,
            'materialSlug' => $materialSlug,
            'submateri'    => $submateri
        ]);
    }
}
