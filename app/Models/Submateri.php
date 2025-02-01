<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submateri extends Model
{
    public function mataPelajaran()
    {
        return $this->belongsTo(MataPelajaran::class);
    }

    // Relasi satu ke banyak dengan model Konten
    public function konten()
    {
        return $this->hasMany(Konten::class, 'id_submateri');
    }
}

