<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MataPelajaranSeeder extends Seeder
{
    public function run()
    {
        // Data mata pelajaran untuk SMA
        $mataPelajaranSMA = [
            'Matematika',
            'Bahasa Indonesia',
            'Bahasa Inggris',
            'Biologi',
            'Kimia',
            'Fisika',
            'Ekonomi',
            'Sosiologi',
            'Geografi',
            'Sejarah',
            'PKN',
            'Penjaskes',
        ];

        // Data mata pelajaran untuk SMK
        $mataPelajaranSMK = [
            'Teknologi dan Rekayasa',
            'Teknologi Informasi dan Komunikasi',
            'Kesehatan dan Farmasi',
            'Agribisnis dan Agriteknologi',
            'Kemaritiman',
            'Bisnis Manajemen',
            'Pariwisata',
            'Seni dan Industri Kreatif',
            'Energi dan Pertambangan',
        ];

        // Data mata pelajaran untuk SMK
        $mataPelajaranSLB = [
            'Tunanetra',
            'Tunarungu',
            'Tunagrahita',
            'Tunadaksa',
            'Tunalaras',
            'Tunawicara',
            'Tunaganda',
        ];

        // ID jenjang untuk SMA (1,2,3)
        $jenjangSMA = [1, 2, 3];

        // ID jenjang untuk SMK (4,5,6)
        $jenjangSMK = [4, 5, 6];

        // ID jenjang untuk SLB 
        $jenjangSLB = [7,8,9];

        // Insert mata pelajaran SMA
        foreach ($jenjangSMA as $jenjangId) {
            foreach ($mataPelajaranSMA as $pelajaran) {
                DB::table('mata_pelajaran')->insert([
                    'id_jenjang' => $jenjangId,
                    'nama_pelajaran' => $pelajaran,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }

        // Insert mata pelajaran SMK
        foreach ($jenjangSMK as $jenjangId) {
            foreach ($mataPelajaranSMK as $pelajaran) {
                DB::table('mata_pelajaran')->insert([
                    'id_jenjang' => $jenjangId,
                    'nama_pelajaran' => $pelajaran,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
        // Insert mata pelajaran SLB
        foreach ($jenjangSLB as $jenjangId) {
            foreach ($mataPelajaranSLB as $pelajaran) {
                DB::table('mata_pelajaran')->insert([
                    'id_jenjang' => $jenjangId,
                    'nama_pelajaran' => $pelajaran,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
