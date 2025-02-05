<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rangkuman;

class RangkumanController extends Controller
{
    public function show($submateriId)
    {
        $rangkuman = Rangkuman::where('id_submateri', $submateriId)->first();

        return response()->json([
            'summary' => $rangkuman->file_rangkuman ?? 'Rangkuman materi akan ditampilkan di sini...'
        ]);
    }
}
