<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Konten extends Model
{
    protected $fillable = [
        'id_submateri', 'judul_konten', 'deskripsi', 'thumbnail', 'link_konten',
    ];

    public function submateri()
    {
        return $this->belongsTo(Submateri::class, 'id_submateri');
    }
}
