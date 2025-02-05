<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Konten extends Model
{
    use HasFactory;

    protected $table = 'konten'; 

    protected $fillable = [
        'id_submateri', 'judul_konten', 'deskripsi', 'thumbnail', 'link_konten', 'id_jenjang'
    ];

    public function submateri()
    {
        return $this->belongsTo(Submateri::class, 'id_submateri');
    }

    public function jenjang()
    {
        return $this->belongsTo(Jenjang::class, 'id_jenjang');
    }
    public function mataPelajaran()
    {
        return $this->belongsTo(MataPelajaran::class, 'id_mata_pelajaran');
    }

}
