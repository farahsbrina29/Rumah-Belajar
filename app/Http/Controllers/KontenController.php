<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Konten;

class KontenController extends Controller
{
    public function index(Request $request)
    {
        $query = Konten::with('jenjang'); // Ambil data konten beserta jenjangnya

        // Filter berdasarkan nama_jenjang jika ada request
        if ($request->has('jenjang')) {
            $query->whereHas('jenjang', function ($q) use ($request) {
                $q->where('nama_jenjang', $request->jenjang);
            });
        }

        return response()->json($query->get());
    }
}

