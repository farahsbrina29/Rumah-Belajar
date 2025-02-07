<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submateri;

class TabelKontenController extends Controller
{
    // Ambil data submateri dengan relasi ke jenjang, konten, dan mata pelajaran
    public function index()
    {
        $data = Submateri::with(['jenjang', 'konten', 'mataPelajaran'])
            ->get()
            ->map(function ($submateri) {
                return [
                    'id'               => $submateri->id,
                    'nama_submateri'   => $submateri->nama_submateri,
                    'nama_jenjang'     => $submateri->jenjang ? $submateri->jenjang->nama_jenjang : '-',
                    'judul_konten'     => $submateri->konten ? $submateri->konten->judul_konten : '-',
                    'deskripsi'        => $submateri->konten ? $submateri->konten->deskripsi : '-',
                    'nama_pelajaran'   => $submateri->mataPelajaran ? $submateri->mataPelajaran->nama_pelajaran : '-',
                    'thumbnail'        => $submateri->konten ? $submateri->konten->thumbnail : '-', // Kolom tambahan
                    'link_konten'      => $submateri->konten ? $submateri->konten->link_konten : '-', // Kolom tambahan
                ];
            });

        return response()->json($data);
    }

    // Update salah satu kolom data
    public function update(Request $request, $id)
    {
        $submateri = Submateri::findOrFail($id);
        
        // Validasi input
        $request->validate([
            'nama_submateri'       => 'string|max:255',
            'id_jenjang'           => 'exists:jenjang,id',
            'id_mata_pelajaran'    => 'exists:mata_pelajaran,id',
        ]);

        $submateri->update($request->all());

        return response()->json([
            'message' => 'Data berhasil diperbarui',
            'data' => $submateri
        ]);
    }

    // Hapus data
    public function destroy($id)
    {
        $submateri = Submateri::findOrFail($id);
        $submateri->delete();

        return response()->json(['message' => 'Data berhasil dihapus']);
    }
}
