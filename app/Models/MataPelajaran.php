<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MataPelajaran extends Model
{
    public function kategoriSekolah()
    {
        return $this->belongsTo(KategoriSekolah::class);
    }

    public function submateri()
    {
        return $this->hasMany(Submateri::class);
    }

    public function kelas()
    {
        return $this->belongsToMany(Kelas::class, 'submateri');
    }
}

