<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SubmateriController extends Controller
{
    public function getSubmateri(Request $request) 
    {
    $idMataPelajaran = $request->query('id_mata_pelajaran');
    $idJenjang = $request->query('id_jenjang');
    
    if (!$idMataPelajaran || !$idJenjang) {
        return response()->json(['message' => 'idMataPelajaran dan idJenjang wajib dikirim'], 400);
    }
    
    // Tambahkan logging untuk debug
    \Log::info("Fetching submateri with id_mata_pelajaran: {$idMataPelajaran}, id_jenjang: {$idJenjang}");
    
    $submateri = Submateri::select('id', 'nama_submateri', 'nama_pelajaran', 'nama_jenjang', 'id_jenjang', 'id_mata_pelajaran')
                  ->where('id_mata_pelajaran', $idMataPelajaran)
                  ->where('id_jenjang', $idJenjang)
                  ->get();
    
    // Log hasil query untuk memeriksa
    \Log::info("Found submateri: " . $submateri->count(), $submateri->toArray());
    
    return response()->json($submateri);
    }
}
