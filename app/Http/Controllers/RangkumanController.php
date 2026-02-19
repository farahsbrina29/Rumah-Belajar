<?php

namespace App\Http\Controllers;

use App\Models\Rangkuman;
use App\Models\Submateri;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RangkumanController extends Controller
{
    /* ================= ADMIN ================= */

    public function showAdminPage($nama_submateri)
    {
        $submateri = Submateri::whereRaw(
            "LOWER(REPLACE(nama_submateri, ' ', '-')) = ?",
            [Str::slug($nama_submateri)]
        )->firstOrFail();

        $rangkuman = Rangkuman::where('id_submateri', $submateri->id)->get();

        return Inertia::render('Admin/RangkumanPage', [
            'nama_submateri' => $nama_submateri,
            'submateri' => $submateri,
            'rangkuman' => $rangkuman,
        ]);
    }

    public function store(Request $request, $nama_submateri)
    {
        $submateri = Submateri::whereRaw(
            "LOWER(REPLACE(nama_submateri, ' ', '-')) = ?",
            [Str::slug($nama_submateri)]
        )->firstOrFail();

        $request->validate([
            'file_rangkuman' => 'required|mimes:pdf,doc,docx|max:2048',
        ]);

        $existing = Rangkuman::where('id_submateri', $submateri->id)->first();

        if ($existing && $existing->file_rangkuman) {
            Storage::disk('public')->delete($existing->file_rangkuman);
        }

        $path = $request->file('file_rangkuman')
            ->store('rangkuman', 'public');

        Rangkuman::updateOrCreate(
            ['id_submateri' => $submateri->id],
            ['file_rangkuman' => $path]
        );

        return redirect()->back();
    }

    public function destroy($id)
    {
        $rangkuman = Rangkuman::findOrFail($id);

        if ($rangkuman->file_rangkuman) {
            Storage::disk('public')->delete($rangkuman->file_rangkuman);
        }

        $rangkuman->delete();

        return redirect()->back();
    }

    public function download($id)
    {
        $rangkuman = Rangkuman::findOrFail($id);
        return Storage::disk('public')->download($rangkuman->file_rangkuman);
    }

    /* ================= USER ================= */

    public function listUserPage()
    {
        $data = Submateri::join('rangkuman', 'submateri.id', '=', 'rangkuman.id_submateri')
            ->join('jenjang', 'submateri.id_jenjang', '=', 'jenjang.id')
            ->join('mata_pelajaran', 'submateri.id_mata_pelajaran', '=', 'mata_pelajaran.id')
           ->select(
            'rangkuman.id as id_rangkuman',
            'submateri.id_jenjang',
            'submateri.nama_submateri',
            'jenjang.nama_jenjang',
            'mata_pelajaran.nama_pelajaran'
            )
            ->get();

        return Inertia::render('user/Rangkuman', [
            'submateriList' => $data,
        ]);

    }

    public function detailUserPage($nama_submateri)
    {
        $submateri = Submateri::whereRaw(
            "LOWER(REPLACE(nama_submateri, ' ', '-')) = ?",
            [Str::slug($nama_submateri)]
        )->firstOrFail();

        $rangkuman = Rangkuman::where('id_submateri', $submateri->id)->first();

        return Inertia::render('user/DetailRangkuman', [
            'submateri' => $submateri,
            'rangkuman' => $rangkuman,
        ]);

    }

}
