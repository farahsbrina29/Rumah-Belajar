<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Konten;

class KontenController extends Controller
{
    public function index(Request $request)
    {
        $query = Konten::with(['jenjang', 'mataPelajaran']); // Ambil data konten beserta jenjang & mata pelajaran

        // Filter berdasarkan nama_jenjang jika ada request
        if ($request->has('jenjang')) {
            $query->whereHas('jenjang', function ($q) use ($request) {
                $q->where('nama_jenjang', $request->jenjang);
            });
        }

        // Filter berdasarkan id_submateri jika ada request
        if ($request->has('id_submateri')) {
            $query->where('id_submateri', $request->id_submateri);
        }

        return response()->json($query->get());
    }

    public function show($submateriId)
    {
        $konten = Konten::where('id_submateri', $submateriId)->first();

        return response()->json([
            'video_id' => $konten->link_konten ?? 'default123',
            'description' => $konten->deskripsi ?? 'Detail materi akan ditampilkan di sini...',
            'mata_pelajaran' => $konten->mataPelajaran->nama_pelajaran ?? 'Tidak Diketahui'
        ]);
    }
}
