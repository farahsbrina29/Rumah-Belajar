<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Submateri extends Model
{
    protected $table = 'submateri'; 
    protected $fillable = [ 'nama_submateri', 'id_mata_pelajaran', 'id_jenjang'];
    protected $casts = [
        'id_mata_pelajaran' => 'integer',
        'id_jenjang' => 'integer'
    ];

     public function getSlugAttribute()
    {
        return Str::slug($this->nama_submateri, '-');
    }
    
    public function mataPelajaran()
    {
        return $this->belongsTo(MataPelajaran::class, 'id_mata_pelajaran');
    }
    
    public function jenjang()
    {
        return $this->belongsTo(Jenjang::class, 'id_jenjang');
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