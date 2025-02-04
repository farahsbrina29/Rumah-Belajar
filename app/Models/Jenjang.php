<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Jenjang extends Model
{
    use HasFactory;

    protected $table = 'jenjang';
    protected $fillable = ['nama_jenjang'];

    public function mataPelajaran()
    {
        return $this->hasMany(MataPelajaran::class, 'id_jenjang');
    }

    public function konten()
    {
        return $this->hasMany(Konten::class, 'id_jenjang');
    }
}
