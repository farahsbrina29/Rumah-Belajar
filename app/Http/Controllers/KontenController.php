<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Konten;
use Illuminate\Support\Facades\DB;


class KontenController extends Controller
{
    public function index(Request $request)
{
    $query = Konten::with(['jenjang', 'mataPelajaran', 'submateri']); // Ambil data konten beserta jenjang & mata pelajaran

    // Filter berdasarkan nama_jenjang jika ada request
    if ($request->has('jenjang')) {
        $query->whereHas('jenjang', function ($q) use ($request) {
            $q->where('nama_jenjang', $request->jenjang);
        });
    }

    // Filter berdasarkan id_submateri jika ada request
    if ($request->has('nama_submateri')) {
        $query->where('nama_submateri', $request->nama_submateri);
    }

    // Include the thumbnail URL in the response
    return response()->json($query->get()->map(function ($konten) {
        if ($konten->thumbnail) {
            $konten->thumbnail = asset('storage/' . str_replace('public/', '', $konten->thumbnail));
        }
        return $konten;
    }));
}

public function show($submateriId)
{
    $konten = Konten::where('id_submateri', $submateriId)->first();

    return response()->json([
        'video_id' => $konten->link_konten ?? 'default123',
        'description' => $konten->deskripsi ?? 'Detail materi akan ditampilkan di sini...',
        'mata_pelajaran' => $konten->mataPelajaran->nama_pelajaran ?? 'Tidak Diketahui',
        'thumbnail' => $konten->thumbnail ? asset('storage/' . str_replace('public/', '', $konten->thumbnail)) : null,
    ]);
}

    public function getJumlahKonten()
    {
        // Pastikan nama kolom dan join sesuai dengan struktur tabel kamu.
        $data = DB::table('konten')
            ->join('jenjang', 'konten.id_jenjang', '=', 'jenjang.id') // sesuaikan nama kolom jika berbeda
            ->select('jenjang.nama_jenjang', DB::raw('COUNT(konten.id) as jumlah'))
            ->groupBy('jenjang.nama_jenjang')
            ->get();

        return response()->json($data);
    }
}
