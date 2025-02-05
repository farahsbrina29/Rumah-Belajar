<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Submateri extends Model
{
    protected $table = 'submateri'; 
    protected $fillable = ['id', 'nama_submateri', 'id_mata_pelajaran', 'slug'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($submateri) {
            $submateri->slug = Str::slug($submateri->nama_submateri);
        });
    }

    public function mataPelajaran()
    {
        return $this->belongsTo(MataPelajaran::class);
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