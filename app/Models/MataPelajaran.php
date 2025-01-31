<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MataPelajaran extends Model
{
    use HasFactory;

    protected $table = 'mata_pelajaran'; // Nama tabel di database
    protected $primaryKey = 'id'; // Ubah jika primary key bukan 'id'
    public $timestamps = true; // Ubah ke false jika tidak pakai created_at & updated_at

    protected $fillable = [
        'id_jenjang',
        'nama_pelajaran'
    ];

    // Relasi ke Jenjang (Setiap mata pelajaran memiliki satu jenjang)
    public function jenjang()
    {
        return $this->belongsTo(Jenjang::class, 'id_jenjang', 'id');
    }

    // Relasi ke Submateri (Satu mata pelajaran bisa punya banyak submateri)
    public function submateri()
    {
        return $this->hasMany(Submateri::class, 'id_mata_pelajaran', 'id');
    }
}
