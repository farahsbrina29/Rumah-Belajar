<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jenjang extends Model
{
    use HasFactory;

    protected $table = 'jenjang'; // Sesuaikan dengan nama tabel di database
    protected $fillable = ['nama_jenjang']; // Sesuaikan dengan kolom yang ada

    public function mataPelajaran()
    {
        return $this->hasMany(MataPelajaran::class, 'id_jenjang');
    }
}
