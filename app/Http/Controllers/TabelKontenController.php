<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submateri;
use App\Models\Konten;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use DB;

class TabelKontenController extends Controller
{
    // Ambil data submateri dengan relasi ke jenjang, konten, dan mata pelajaran
    public function index()
    {
        $data = Submateri::with(['jenjang', 'konten', 'mataPelajaran'])
            ->get()
            ->map(function ($submateri) {
                return [
                    'id'               => $submateri->id,
                    'nama_submateri'   => $submateri->nama_submateri,
                    'nama_jenjang'     => $submateri->jenjang ? $submateri->jenjang->nama_jenjang : '-',
                    'judul_konten'     => $submateri->konten ? $submateri->konten->judul_konten : '-',
                    'deskripsi'        => $submateri->konten ? $submateri->konten->deskripsi : '-',
                    'nama_pelajaran'   => $submateri->mataPelajaran ? $submateri->mataPelajaran->nama_pelajaran : '-',
                    'jenis_konten'     => $submateri->konten ? $submateri->konten->jenis_konten : '-',
                    'thumbnail'        => $submateri->konten && $submateri->konten->thumbnail
                                            ? asset('storage/' . str_replace('public/', '', $submateri->konten->thumbnail))
                                            : null,
                    'link_konten'      => $submateri->konten ? $submateri->konten->link_konten : '-',
                ];
            });

        return response()->json($data);
    }

    public function show($id)
    {
        $submateri = Submateri::with('konten')->find($id);

        if (!$submateri || !$submateri->konten) {
            return response()->json(['message' => 'Konten tidak ditemukan'], 404);
        }

        return response()->json([
            'id'            => $submateri->konten->id,
            'judul_konten'  => $submateri->konten->judul_konten,
            'deskripsi'     => $submateri->konten->deskripsi,
            'jenis_konten'  => $submateri->konten->jenis_konten,
            'thumbnail'     => $submateri->konten->thumbnail
                                ? asset('storage/' . str_replace('public/', '', $submateri->konten->thumbnail))
                                : null,
            'link_konten'   => $submateri->konten->link_konten,
        ], 200);
    }


    public function update(Request $request, $id_submateri)
    {
        DB::beginTransaction();

        try {
            $submateri = Submateri::findOrFail($id_submateri);
            $konten = Konten::where('id_submateri', $id_submateri)->firstOrFail();

           
            $validated = $request->validate([
                'judul_konten' => 'required|string|max:255',
                'deskripsi'    => 'required|string',
                'jenis_konten' => ['required', Rule::in(['video', 'lainnya'])],
                'link_konten'  => 'nullable|required_if:jenis_konten,video|string',
                'thumbnail'    => 'nullable|image|max:5120',
            ]);

            // HANDLE THUMBNAIL
            if ($request->hasFile('thumbnail')) {
                if ($konten->thumbnail && Storage::disk('public')->exists($konten->thumbnail)) {
                    Storage::disk('public')->delete($konten->thumbnail);
                }

                $validated['thumbnail'] = $request
                    ->file('thumbnail')
                    ->store('thumbnails', 'public');
            }

            
            if ($validated['jenis_konten'] === 'lainnya') {
                $validated['link_konten'] = '-';
            }

            $konten->update($validated);

            DB::commit();

           
            return back()->with('success', 'Konten berhasil diperbarui');

        } catch (\Throwable $e) {
            DB::rollBack();

           
            return back()->withErrors([
                'message' => 'Gagal memperbarui konten: ' . $e->getMessage()
            ]);
        }
    }


    public function destroy($id_submateri)
    {
        try {
            DB::beginTransaction();

            $submateri = Submateri::findOrFail($id_submateri);

            if ($submateri->konten) {
                $konten = $submateri->konten;

                if ($konten->thumbnail && Storage::disk('public')->exists($konten->thumbnail)) {
                    Storage::disk('public')->delete($konten->thumbnail);
                }

                $konten->delete();
            }

            $submateri->delete();

            DB::commit();
            return response()->json([
                'success'   => true,
                'message'   => 'Submateri dan konten terkait berhasil dihapus'
            ], 200);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success'   => false,
                'message'   => 'Gagal menghapus submateri: ' . $e->getMessage()
            ], 500);
        }
    }
}
