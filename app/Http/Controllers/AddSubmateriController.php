<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submateri;
use App\Models\MataPelajaran;
use App\Models\Konten;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AddSubmateriController extends Controller
{
    private function createKonten($submateriId, $jenjangId, $mataPelajaranId)
    {
        return Konten::create([
            'id_submateri' => $submateriId,
            'id_jenjang' => $jenjangId,
            'id_mata_pelajaran' => $mataPelajaranId,
            'judul_konten' => '-',
            'deskripsi' => '-',
            'jenis_konten' => '-',
            'thumbnail' => '-',
            'link_konten' => '-'
        ]);
    }

    public function getListMataPelajaran($jenjang_id)
    {
        if (!is_numeric($jenjang_id)) {
            return response()->json(['error' => 'ID Jenjang tidak valid'], 400);
        }

        $mataPelajaran = MataPelajaran::where('id_jenjang', $jenjang_id)->get();

        if ($mataPelajaran->isEmpty()) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }

        return response()->json($mataPelajaran);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nama_submateri' => 'required|string|max:255',
            'jenjang_id' => 'required|exists:jenjang,id',
            'mata_pelajaran_id' => 'required|exists:mata_pelajaran,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors' => $validator->errors(),
            ], 422);
        }

        DB::beginTransaction();

        try {
            \Log::info('Mulai menyimpan submateri');
            
            $submateri = Submateri::create([
                'nama_submateri' => $request->nama_submateri,
                'id_jenjang' => $request->jenjang_id,
                'id_mata_pelajaran' => $request->mata_pelajaran_id,
            ]);
        
            \Log::info('Submateri berhasil disimpan', ['id' => $submateri->id]);
        
            $konten = $this->createKonten(
                $submateri->id,
                $request->jenjang_id,
                $request->mata_pelajaran_id
            );
        
            \Log::info('Konten berhasil disimpan', ['id' => $konten->id]);
        
            DB::commit();
        
            return response()->json([
                'success' => true,
                'message' => 'Submateri dan konten berhasil ditambahkan',
                'data' => [
                    'submateri' => $submateri,
                    'konten' => $konten
                ]
            ], 201);
        
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Tambah submateri gagal: ' . $e->getMessage());
        
            return response()->json([
                'success' => false,
                'message' => 'Terjadi kesalahan',
                'error' => $e->getMessage()
            ], 500);
        }
        
    }
}