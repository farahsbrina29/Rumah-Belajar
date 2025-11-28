<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Latihan;
use App\Models\Submateri;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LatihanController extends Controller
{
    /**
     * Halaman UI pakai Inertia
     */
    public function showPage($nama_submateri)
    {
        $submateri = Submateri::whereRaw("LOWER(REPLACE(nama_submateri, ' ', '-')) = ?", [Str::slug($nama_submateri)])
            ->firstOrFail();

        $latihan = Latihan::where('id_submateri', $submateri->id)->get();

        return Inertia::render('Admin/ExercisePage', [
            'nama_submateri' => $nama_submateri,
            'submateri'      => $submateri->toArray(),
            'latihan'        => $latihan->toArray(),
        ]);
    }

    /**
     * API: Menampilkan semua latihan soal berdasarkan submateri
     */
    public function index($nama_submateri)
    {
        $submateri = Submateri::whereRaw("LOWER(REPLACE(nama_submateri, ' ', '-')) = ?", [Str::slug($nama_submateri)])
            ->firstOrFail();

        $latihan = Latihan::where('id_submateri', $submateri->id)->get();

        return response()->json([
            'status'    => 'success',
            'submateri' => $submateri,
            'latihan'   => $latihan
        ], 200);
    }

    /**
     * API: Menyimpan soal latihan baru
     */
    public function store(Request $request, $nama_submateri)
    {
        $submateri = Submateri::whereRaw("LOWER(REPLACE(nama_submateri, ' ', '-')) = ?", [Str::slug($nama_submateri)])
            ->firstOrFail();

        $validated = $request->validate([
            'pertanyaan'     => 'required|string',
            'opsi_a'         => 'required|string',
            'opsi_b'         => 'required|string',
            'opsi_c'         => 'nullable|string',
            'opsi_d'         => 'nullable|string',
            'jawaban_benar'  => 'required|string|in:A,B,C,D',
        ]);

        $latihan = Latihan::create([
            'id_submateri'  => $submateri->id,
            'pertanyaan'    => $validated['pertanyaan'],
            'opsi_a'        => $validated['opsi_a'],
            'opsi_b'        => $validated['opsi_b'],
            'opsi_c'        => $validated['opsi_c'] ?? null,
            'opsi_d'        => $validated['opsi_d'] ?? null,
            'jawaban_benar' => $validated['jawaban_benar'],
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Latihan soal berhasil ditambahkan',
            'latihan' => $latihan
        ], 201);
    }

    /**
     * API: Update soal latihan
     */
    public function update(Request $request, $id)
    {
        $latihan = Latihan::find($id);

        if (!$latihan) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Soal latihan tidak ditemukan'
            ], 404);
        }

        $validated = $request->validate([
            'pertanyaan'     => 'required|string',
            'opsi_a'         => 'required|string',
            'opsi_b'         => 'required|string',
            'opsi_c'         => 'nullable|string',
            'opsi_d'         => 'nullable|string',
            'jawaban_benar'  => 'required|string|in:A,B,C,D',
        ]);

        $latihan->update($validated);

        return response()->json([
            'status'  => 'success',
            'message' => 'Soal latihan berhasil diperbarui',
            'latihan' => $latihan
        ], 200);
    }

    /**
     * API: Hapus soal latihan
     */
    public function destroy($id)
    {
        $latihan = Latihan::find($id);

        if (!$latihan) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Soal latihan tidak ditemukan'
            ], 404);
        }

        $latihan->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Soal latihan berhasil dihapus'
        ], 200);
    }
}
