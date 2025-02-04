<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class KontenSeeder extends Seeder
{
    /**
     * Jalankan seeder database.
     */
    public function run(): void
    {
        DB::table('konten')->insert([
            [
                'id_submateri' => 1,
                'judul_konten' => 'Pengenalan Laravel',
                'deskripsi' => 'Materi dasar tentang Laravel untuk pemula.',
                'thumbnail' => 'pengenalan-laravel.jpg',
                'link_konten' => 'https://example.com/laravel-intro',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id_submateri' => 2,
                'judul_konten' => 'Dasar-Dasar PHP',
                'deskripsi' => 'Mempelajari dasar-dasar PHP untuk pengembangan web.',
                'thumbnail' => 'dasar-php.jpg',
                'link_konten' => 'https://example.com/php-basics',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'id_submateri' => 3,
                'judul_konten' => 'Mengenal MVC',
                'deskripsi' => 'Penjelasan konsep Model-View-Controller dalam pengembangan aplikasi.',
                'thumbnail' => 'mvc-pattern.jpg',
                'link_konten' => 'https://example.com/mvc-intro',
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ]);
    }
}
