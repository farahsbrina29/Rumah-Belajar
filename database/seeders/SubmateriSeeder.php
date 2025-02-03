<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SubmateriSeeder extends Seeder
{
    public function run()
    {
        // ID mata pelajaran yang akan diberi submateri
        $idMataPelajaran = [1, 2, 3, 4, 5, 6];

        // Submateri yang akan dimasukkan
        $submateri = ['Materi 1', 'Materi 2', 'Materi 3'];

        // Insert data submateri untuk setiap mata pelajaran
        foreach ($idMataPelajaran as $mataPelajaranId) {
            foreach ($submateri as $materi) {
                DB::table('submateri')->insert([
                    'id_mata_pelajaran' => $mataPelajaranId,
                    'nama_submateri' => $materi,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
