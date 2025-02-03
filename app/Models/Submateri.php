<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submateri extends Model
{
    use HasFactory;

    protected $table = 'submateri';

    // Relasi ke model MataPelajaran
    public function mataPelajaran()
    {
        return $this->belongsTo(MataPelajaran::class, 'id_mata_pelajaran'); // pastikan foreign key sesuai
    }

    // Relasi satu ke banyak dengan model Konten
    public function konten()
    {
        return $this->hasMany(Konten::class, 'id_submateri'); // pastikan foreign key sesuai
    }

    // Jika menggunakan timestamps, tambahkan ini
    // public $timestamps = true;

    // Jika tidak menggunakan timestamps, tambahkan ini
    // public $timestamps = false;
}
