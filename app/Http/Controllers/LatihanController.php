<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Latihan;
use App\Models\Submateri;
use Inertia\Inertia;
use Illuminate\Support\Str;

class LatihanController extends Controller
{
    public function showPage($nama_submateri)
    {
        $submateri = Submateri::whereRaw(
            "LOWER(REPLACE(nama_submateri, ' ', '-')) = ?",
            [Str::slug($nama_submateri)]
        )->firstOrFail();

        $latihan = Latihan::where('id_submateri', $submateri->id)->get();

        return Inertia::render('Admin/ExercisePage', [
            'nama_submateri' => $nama_submateri,
            'submateri' => $submateri,
            'latihanList' => $latihan, // ✅ penting
        ]);
    }

    public function store(Request $request, $nama_submateri)
    {
        $submateri = Submateri::whereRaw(
            "LOWER(REPLACE(nama_submateri, ' ', '-')) = ?",
            [Str::slug($nama_submateri)]
        )->firstOrFail();

        $validated = $request->validate([
            'pertanyaan' => 'required|string',
            'opsi_a' => 'required|string',
            'opsi_b' => 'required|string',
            'opsi_c' => 'nullable|string',
            'opsi_d' => 'nullable|string',
            'jawaban_benar' => 'required|in:A,B,C,D',
        ]);

        Latihan::create([
            'id_submateri'   => $submateri->id,
            'pertanyaan'     => $validated['pertanyaan'],
            'opsi_a'         => $validated['opsi_a'],
            'opsi_b'         => $validated['opsi_b'],
            'opsi_c'         => $validated['opsi_c'] ?? null,
            'opsi_d'         => $validated['opsi_d'] ?? null,
            'jawaban_benar'  => $validated['jawaban_benar'],
        ]);


        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $latihan = Latihan::findOrFail($id);

        $validated = $request->validate([
            'pertanyaan' => 'required|string',
            'opsi_a' => 'required|string',
            'opsi_b' => 'required|string',
            'opsi_c' => 'nullable|string',
            'opsi_d' => 'nullable|string',
            'jawaban_benar' => 'required|in:A,B,C,D',
        ]);

        $latihan->update($validated);

        return redirect()->back();
    }

    public function destroy($id)
    {
        Latihan::findOrFail($id)->delete();
        return redirect()->back();
    }
}
