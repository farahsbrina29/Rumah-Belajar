<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class JenjangSeeder extends Seeder
{
    public function run()
    {
        DB::table('jenjang')->insert([
            ['nama_jenjang' => 'Kelas 10 SMA'],
            ['nama_jenjang' => 'Kelas 11 SMA'],
            ['nama_jenjang' => 'Kelas 12 SMA'],
            ['nama_jenjang' => 'Kelas 10 SMK'],
            ['nama_jenjang' => 'Kelas 11 SMK'],
            ['nama_jenjang' => 'Kelas 12 SMK'],
            ['nama_jenjang' => 'SDLB'],
            ['nama_jenjang' => 'SMPLB'],
            ['nama_jenjang' => 'SMALB'],
        ]);
    }
}
