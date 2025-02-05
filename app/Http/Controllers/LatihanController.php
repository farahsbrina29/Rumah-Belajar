<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Latihan;

class LatihanController extends Controller
{
    public function show($submateriId)
    {
        $latihan = Latihan::where('id_submateri', $submateriId)->get();

        return response()->json(
            $latihan->map(function ($exercise) {
                return [
                    'id' => $exercise->id,
                    'question' => $exercise->pertanyaan,
                    'options' => [$exercise->opsi_a, $exercise->opsi_b, $exercise->opsi_c, $exercise->opsi_d],
                    'answer' => $exercise->jawaban_benar
                ];
            })
        );
    }
}

