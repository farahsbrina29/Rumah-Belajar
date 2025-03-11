<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rangkuman;
use App\Models\Submateri;

class RangkumanController extends Controller
{
    /**
     * Menampilkan rangkuman berdasarkan ID submateri.
     */
    public function showBySubmateri($id_submateri = null) // Bisa menerima ID dari URL
    {
        if ($id_submateri) {
            // Ambil rangkuman berdasarkan ID submateri
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
                    'success' => false,
                    'message' => 'Rangkuman tidak ditemukan untuk ID submateri ini.'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $rangkuman
            ]);
        }

        // Jika ID tidak diberikan, tampilkan semua submateri yang memiliki rangkuman
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
            'success' => true,
            'data' => $submateriWithRangkuman
        ]);
    }
}
