<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jenjang extends Model
{
    public function kategoriSekolah()
    {
        return $this->belongsTo(KategoriSekolah::class);
    }

    public function mataPelajaran()
    {
        return $this->hasMany(MataPelajaran::class, 'id_jenjang');
    }
}


