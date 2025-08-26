<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rangkuman;
use App\Models\Submateri;
use Illuminate\Support\Str;

class RangkumanController extends Controller
{
    /**
     * GET /rangkuman
     * Jika ada query ?id_submateri= maka filter per submateri
     * Jika tidak, ambil semua rangkuman dengan relasi submateri, jenjang, mata pelajaran
     */
    public function showBySubmateri(Request $request)
    {
        $id_submateri = $request->query('id_submateri');

        if ($id_submateri) {
            $rangkuman = Rangkuman::join('submateri', 'rangkuman.id_submateri', '=', 'submateri.id')
                ->where('rangkuman.id_submateri', $id_submateri)
                ->select(
                    'rangkuman.id',
                    'rangkuman.id_submateri',
                    'rangkuman.file_rangkuman',
                    'submateri.nama_submateri'
                )
                ->first();

            if (!$rangkuman) {
                return response()->json([
                    'status'  => 'error',
                    'message' => 'Rangkuman tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data'   => $rangkuman
            ], 200);
        }

        // Ambil semua jika tidak ada filter
        $submateriWithRangkuman = Submateri::join('rangkuman', 'submateri.id', '=', 'rangkuman.id_submateri')
            ->join('jenjang', 'submateri.id_jenjang', '=', 'jenjang.id')
            ->join('mata_pelajaran', 'submateri.id_mata_pelajaran', '=', 'mata_pelajaran.id')
            ->select(
                'submateri.id as id_submateri',
                'submateri.nama_submateri',
                'jenjang.nama_jenjang',
                'submateri.id_jenjang',
                'mata_pelajaran.nama_pelajaran',
                'rangkuman.id as id_rangkuman',
                'rangkuman.file_rangkuman'
            )
            ->distinct()
            ->get();

        return response()->json([
            'status' => 'success',
            'data'   => $submateriWithRangkuman
        ], 200);
    }

    /**
     * GET /submateri/{nama_submateri}/rangkuman
     */
    public function index($nama_submateri)
    {
        $submateri = Submateri::whereRaw("LOWER(REPLACE(nama_submateri, ' ', '-')) = ?", [Str::slug($nama_submateri)])
            ->first();

        if (!$submateri) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Submateri tidak ditemukan'
            ], 404);
        }

        $rangkuman = Rangkuman::where('id_submateri', $submateri->id)->get();

        return response()->json([
            'status'    => 'success',
            'submateri' => $submateri,
            'rangkuman' => $rangkuman
        ], 200);
    }

    /**
     * POST /submateri/{nama_submateri}/rangkuman
     */
    public function store(Request $request, $nama_submateri)
    {
        $submateri = Submateri::whereRaw("LOWER(REPLACE(nama_submateri, ' ', '-')) = ?", [Str::slug($nama_submateri)])
            ->first();

        if (!$submateri) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Submateri tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'file_rangkuman' => 'required|mimes:pdf,doc,docx|max:2048',
        ]);

        $path = $request->file('file_rangkuman')->store('rangkuman', 'public');

        $rangkuman = Rangkuman::create([
            'id_submateri'   => $submateri->id,
            'file_rangkuman' => $path,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Rangkuman berhasil diupload',
            'data'    => $rangkuman
        ], 201);
    }
}
