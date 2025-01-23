<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MataPelajaran extends Model
{
    
    public function jenjang()
    {
        return $this->belongsTo(Kelas::class, 'id_jenjang');
    }

    public function submateri()
    {
        return $this->hasMany(Submateri::class);
    }
}


