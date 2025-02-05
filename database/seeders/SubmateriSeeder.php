<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class SubmateriSeeder extends Seeder
{
    public function run()
    {
        // ID mata pelajaran yang akan diberi submateri
        $mataPelajaranIds = [1, 2, 3, 4, 5, 6];

        // Submateri yang akan dimasukkan
        $submateri = ['Materi 1', 'Materi 2', 'Materi 3', 'Materi 4'];

        // Insert data submateri untuk setiap mata pelajaran
        foreach ($mataPelajaranIds as $mataPelajaranId) {
            foreach ($submateri as $materi) {
                try {
                    DB::table('submateri')->insert([
                        'id_mata_pelajaran' => $mataPelajaranId,
                        'nama_submateri' => $materi,
                        'slug' => Str::slug($materi, '-'),
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]);
                    Log::info("Submateri '$materi' berhasil ditambahkan untuk mata pelajaran $mataPelajaranId");
                } catch (\Exception $e) {
                    Log::error("Gagal menambahkan submateri '$materi' untuk mata pelajaran $mataPelajaranId: " . $e->getMessage());
                }
            }
        }
    }
}