<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rangkuman;
use App\Models\Submateri;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RangkumanController extends Controller
{
    
    public function showPage($nama_submateri)
    {
        $submateri = Submateri::whereRaw("LOWER(REPLACE(nama_submateri, ' ', '-')) = ?", [Str::slug($nama_submateri)])
            ->first();

        if (!$submateri) {
            abort(404, 'Submateri tidak ditemukan');
        }

        $rangkuman = Rangkuman::where('id_submateri', $submateri->id)->get();

        return Inertia::render('Admin/RangkumanPage', [
            'nama_submateri' => $nama_submateri,
            'submateri' => $submateri->toArray(), // Convert to array for Inertia
            'rangkuman' => $rangkuman->toArray()  // Convert to array for Inertia
        ]);
    }
    

   public function showBySubmateri(Request $request, $nama_submateri = null)
    {
        if ($nama_submateri) {
            $rangkuman = Rangkuman::join('submateri', 'rangkuman.id_submateri', '=', 'submateri.id')
                ->where('submateri.nama_submateri', $nama_submateri)
                ->select(
                    'rangkuman.id',
                    'rangkuman.id_submateri',
                    'rangkuman.file_rangkuman',
                    'submateri.nama_submateri'
                )
                ->first();

            if (!$rangkuman) {
                return response()->json([
                    'status'  => 'error',
                    'message' => 'Rangkuman tidak ditemukan'
                ], 404);
            }

            return response()->json([
                'status' => 'success',
                'data'   => $rangkuman
            ], 200);
        }

        // 🔽 Kalau tidak ada filter → tampilkan semua
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
            'status' => 'success',
            'data'   => $submateriWithRangkuman
        ], 200);
    }

    
    public function index($nama_submateri)
    {
        $submateri = Submateri::whereRaw("LOWER(REPLACE(nama_submateri, ' ', '-')) = ?", [Str::slug($nama_submateri)])
            ->first();

        if (!$submateri) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Submateri tidak ditemukan'
            ], 404);
        }

        $rangkuman = Rangkuman::where('id_submateri', $submateri->id)->get();

        return response()->json([
            'status'    => 'success',
            'submateri' => $submateri,
            'rangkuman' => $rangkuman
        ], 200);
    }

    /**
     * POST /api/submateri/{nama_submateri}/rangkuman
     * API untuk mengupload rangkuman
     */
    public function store(Request $request, $nama_submateri)
    {
        $submateri = Submateri::whereRaw("LOWER(REPLACE(nama_submateri, ' ', '-')) = ?", [Str::slug($nama_submateri)])
            ->first();

        if (!$submateri) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Submateri tidak ditemukan'
            ], 404);
        }

        $request->validate([
            'file_rangkuman' => 'required|mimes:pdf,doc,docx|max:2048',
        ]);

        // Cek apakah sudah ada rangkuman untuk submateri ini
        $existingRangkuman = Rangkuman::where('id_submateri', $submateri->id)->first();
        
        if ($existingRangkuman) {
            // Hapus file lama jika ada
            if (file_exists(storage_path('app/public/' . $existingRangkuman->file_rangkuman))) {
                unlink(storage_path('app/public/' . $existingRangkuman->file_rangkuman));
            }
            
            // Update rangkuman yang sudah ada
            $path = $request->file('file_rangkuman')->store('rangkuman', 'public');
            $existingRangkuman->update([
                'file_rangkuman' => $path,
            ]);

            return response()->json([
                'status'  => 'success',
                'message' => 'Rangkuman berhasil diupdate',
                'data'    => $existingRangkuman
            ], 200);
        }

        // Buat rangkuman baru
        $path = $request->file('file_rangkuman')->store('rangkuman', 'public');

        $rangkuman = Rangkuman::create([
            'id_submateri'   => $submateri->id,
            'file_rangkuman' => $path,
        ]);

        return response()->json([
            'status'  => 'success',
            'message' => 'Rangkuman berhasil diupload',
            'data'    => $rangkuman
        ], 201);
    }

    /**
     * DELETE /api/rangkuman/{id}
     * API untuk menghapus rangkuman
     */
    public function destroy($id)
    {
        $rangkuman = Rangkuman::find($id);

        if (!$rangkuman) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Rangkuman tidak ditemukan'
            ], 404);
        }

        // Hapus file dari storage
        if (file_exists(storage_path('app/public/' . $rangkuman->file_rangkuman))) {
            unlink(storage_path('app/public/' . $rangkuman->file_rangkuman));
        }

        $rangkuman->delete();

        return response()->json([
            'status'  => 'success',
            'message' => 'Rangkuman berhasil dihapus'
        ], 200);
    }

     public function download($id)
    {
        try {
            $rangkuman = Rangkuman::findOrFail($id);
            
            if (!$rangkuman->file_rangkuman) {
                return response()->json([
                    'message' => 'File tidak ditemukan'
                ], 404);
            }

            $filePath = storage_path('app/public/' . $rangkuman->file_rangkuman);
            
            // Cek apakah file benar-benar ada
            if (!file_exists($filePath)) {
                return response()->json([
                    'message' => 'File fisik tidak ditemukan di server'
                ], 404);
            }

            // Get original filename
            $fileName = basename($rangkuman->file_rangkuman);
            
            // Set proper headers for download
            $headers = [
                'Content-Type' => $this->getMimeType($filePath),
                'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
                'Content-Length' => filesize($filePath),
                'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
                'Pragma' => 'public',
                'Expires' => '0',
            ];

            return response()->download($filePath, $fileName, $headers);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Rangkuman tidak ditemukan'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Download error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Terjadi kesalahan saat mendownload file'
            ], 500);
        }
    }

    /**
     * Get MIME type for file
     */
    private function getMimeType($filePath)
    {
        $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        
        $mimeTypes = [
            'pdf' => 'application/pdf',
            'doc' => 'application/msword',
            'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'txt' => 'text/plain',
        ];

        return $mimeTypes[$extension] ?? 'application/octet-stream';
    }

    /**
     * Alternative: Stream download for large files
     */
    public function streamDownload($id)
    {
        try {
            $rangkuman = Rangkuman::findOrFail($id);
            
            if (!$rangkuman->file_rangkuman) {
                return response()->json([
                    'message' => 'File tidak ditemukan'
                ], 404);
            }

            $filePath = storage_path('app/public/' . $rangkuman->file_rangkuman);
            
            if (!file_exists($filePath)) {
                return response()->json([
                    'message' => 'File fisik tidak ditemukan di server'
                ], 404);
            }

            $fileName = basename($rangkuman->file_rangkuman);

            return response()->streamDownload(function () use ($filePath) {
                echo file_get_contents($filePath);
            }, $fileName, [
                'Content-Type' => $this->getMimeType($filePath),
                'Content-Disposition' => 'attachment; filename="' . $fileName . '"',
            ]);

        } catch (\Exception $e) {
            Log::error('Stream download error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Terjadi kesalahan saat mendownload file'
            ], 500);
        }
    }
}
