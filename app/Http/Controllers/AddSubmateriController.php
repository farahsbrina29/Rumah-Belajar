<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submateri;
use App\Models\MataPelajaran;
use Illuminate\Support\Facades\Validator;

class AddSubmateriController extends Controller
{
    /**
     * Mengambil daftar mata pelajaran berdasarkan jenjang_id.
     */
    public function getListMataPelajaran($jenjang_id)
    {
        // Validasi bahwa jenjang_id harus berupa angka
        if (!is_numeric($jenjang_id)) {
            return response()->json(['error' => 'ID Jenjang tidak valid'], 400);
        }

        // Ambil mata pelajaran berdasarkan jenjang_id
        $mataPelajaran = MataPelajaran::where('id_jenjang', $jenjang_id)->get();

        // Cek jika data kosong
        if ($mataPelajaran->isEmpty()) {
            return response()->json(['error' => 'Data tidak ditemukan'], 404);
        }

        return response()->json($mataPelajaran);
    }

    /**
     * Menambahkan data submateri ke dalam database.
     */
    public function store(Request $request)
    {
        // Validasi input dari frontend
        $validator = Validator::make($request->all(), [
            'nama_submateri'     => 'required|string|max:255',
            'id_jenjang'         => 'required|exists:jenjang,id',      // Sesuaikan dengan nama kolom
            'id_mata_pelajaran'  => 'required|exists:mata_pelajaran,id' // Sesuaikan dengan nama kolom
        ]);
    
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validasi gagal',
                'errors'  => $validator->errors(),
            ], 422);
        }
    
        try {
            // Simpan data ke database dengan nama kolom yang sesuai
            $submateri = Submateri::create([
                'nama_submateri'    => $request->nama_submateri,
                'id_jenjang'        => $request->id_jenjang,         // Sesuaikan dengan request
                'id_mata_pelajaran' => $request->id_mata_pelajaran   // Sesuaikan dengan request
            ]);
    
            return response()->json([
                'message' => 'Submateri berhasil ditambahkan',
                'data'    => $submateri,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Gagal menambahkan submateri',
                'error'   => $e->getMessage(),
            ], 500);
        }
    }
 }

