<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submateri;
use App\Models\MataPelajaran;
use App\Models\Konten;
use Illuminate\Support\Facades\DB;

class AddSubmateriController extends Controller
{
    private function createKonten($submateriId, $jenjangId, $mataPelajaranId)
    {
        return Konten::create([
            'id_submateri'       => $submateriId,
            'id_jenjang'         => $jenjangId,
            'id_mata_pelajaran'  => $mataPelajaranId,
            'judul_konten'       => '-',
            'deskripsi'          => '-',
            'jenis_konten'       => '-',
            'thumbnail'          => '-',
            'link_konten'        => '-',
        ]);
    }

    // 🔁 Dipakai oleh dropdown (tetap JSON, ini OK)
    public function getListMataPelajaran($jenjang_id)
    {
        return MataPelajaran::where('id_jenjang', $jenjang_id)->get();
    }

    // ✅ INERTIA STORE
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_submateri'     => 'required|string|max:255',
            'id_jenjang'         => 'required|exists:jenjang,id',
            'id_mata_pelajaran'  => 'required|exists:mata_pelajaran,id',
        ]);

        DB::beginTransaction();

        try {
            $submateri = Submateri::create([
                'nama_submateri'     => $validated['nama_submateri'],
                'id_jenjang'         => $validated['id_jenjang'],
                'id_mata_pelajaran'  => $validated['id_mata_pelajaran'],
            ]);

            $this->createKonten(
                $submateri->id,
                $validated['id_jenjang'],
                $validated['id_mata_pelajaran']
            );

            DB::commit();

            // ⬅️ WAJIB INI UNTUK INERTIA
            return back()->with('success', 'Submateri berhasil ditambahkan');

        } catch (\Throwable $e) {
            DB::rollBack();

            return back()->withErrors([
                'message' => 'Gagal menambahkan submateri',
            ]);
        }
    }
}
