<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MataPelajaran; // Import Model

class MataPelajaranController extends Controller
{
        public function getMataPelajaranByJenjang($id_jenjang)
    {
        $mataPelajaran = MataPelajaran::where('id_jenjang', $id_jenjang)->get();

        return response()->json($mataPelajaran);
    }
}



