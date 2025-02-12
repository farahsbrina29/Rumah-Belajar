<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Submateri;
use App\Models\Konten;
use Illuminate\Support\Facades\Storage;
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
                    'thumbnail'        => $submateri->konten ? $submateri->konten->thumbnail : '-',
                    'link_konten'      => $submateri->konten ? $submateri->konten->link_konten : '-',
                ];
            });

        return response()->json($data);
    }

    public function show($id)
    {
        // Cari submateri berdasarkan ID yang diberikan
        $submateri = Submateri::with('konten')->find($id);
    
        // Jika submateri tidak ditemukan
        if (!$submateri) {
            return response()->json(['message' => 'Submateri tidak ditemukan'], 404);
        }
    
        // Jika submateri ditemukan, tetapi tidak memiliki konten
        if (!$submateri->konten) {
            return response()->json(['message' => 'Konten tidak ditemukan untuk submateri ini'], 404);
        }
    
        // Kembalikan data konten
        return response()->json([
            'id' => $submateri->konten->id,
            'judul_konten' => $submateri->konten->judul_konten,
            'deskripsi' => $submateri->konten->deskripsi,
            'jenis_konten' => $submateri->konten->jenis_konten,
            'thumbnail' => $submateri->konten->thumbnail,
            'link_konten' => $submateri->konten->link_konten,
        ], 200);
    }
    


    // Update konten yang terkait dengan submateri
    public function update(Request $request, $id_submateri)
    {
        try {
            DB::beginTransaction();
    
            // Cari submateri berdasarkan ID
            $submateri = Submateri::findOrFail($id_submateri);
    
            // Pastikan submateri memiliki konten yang terkait
            $konten = Konten::where('id_submateri', $id_submateri)->first();
            if (!$konten) {
                return response()->json(['message' => 'Konten tidak ditemukan untuk submateri ini'], 404);
            }
    
            // Validasi data input
            $request->validate([
                'judul_konten' => 'required|string|max:255',
                'deskripsi' => 'required|string',
                'jenis_konten' => 'required|string',
                'link_konten' => 'required|string',
                'thumbnail' => 'nullable|image|max:5120',
            ]);
    
            // Hapus thumbnail lama jika ada thumbnail baru
            if ($request->hasFile('thumbnail')) {
                if ($konten->thumbnail && Storage::disk('public')->exists($konten->thumbnail)) {
                    Storage::disk('public')->delete($konten->thumbnail);
                }
                $thumbnailPath = $request->file('thumbnail')->store('thumbnails', 'public');
                $konten->thumbnail = $thumbnailPath;
            }
    
            // Update konten
            $konten->update([
                'judul_konten' => $request->judul_konten,
                'deskripsi' => $request->deskripsi,
                'jenis_konten' => $request->jenis_konten,
                'link_konten' => $request->link_konten,
            ]);
    
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Konten berhasil diperbarui',
                'data' => $konten
            ], 200);
    
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Gagal memperbarui konten: ' . $e->getMessage()
            ], 500);
        }
    }
    

    public function destroy($id_submateri)
    {
        try {
            DB::beginTransaction();
    
            // Cari submateri berdasarkan ID
            $submateri = Submateri::findOrFail($id_submateri);
    
            // Hapus konten yang terkait jika ada
            if ($submateri->konten) {
                $konten = $submateri->konten;
    
                // Hapus thumbnail dari storage jika ada
                if ($konten->thumbnail && Storage::disk('public')->exists($konten->thumbnail)) {
                    Storage::disk('public')->delete($konten->thumbnail);
                }
    
                // Hapus konten
                $konten->delete();
            }
    
            // Hapus submateri
            $submateri->delete();
    
            DB::commit();
            return response()->json([
                'success' => true,
                'message' => 'Submateri dan konten terkait berhasil dihapus'
            ], 200);
    
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Gagal menghapus submateri: ' . $e->getMessage()
            ], 500);
        }
    }
    
    }
    