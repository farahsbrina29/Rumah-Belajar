<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Submateri extends Model
{
    protected $table = 'submateri'; 
    protected $fillable = ['id', 'nama_submateri', 'id_mata_pelajaran'];


    public function mataPelajaran()
    {
        return $this->belongsTo(MataPelajaran::class, 'id_mata_pelajaran');
    }
    
    public function jenjang()
    {
        return $this->belongsTo(Jenjang::class, 'id_jenjang', 'id');
    }

        public function konten()
    {
        return $this->hasOne(Konten::class, 'id_submateri');
    }

    public function latihan()
    {
        return $this->hasMany(Latihan::class, 'id_submateri');
    }    

    public function rangkuman()
    {
        return $this->hasOne(Rangkuman::class, 'id_submateri');
    }
}