<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Latihan extends Model
{
    use HasFactory;
    

    // Menentukan nama tabel yang benar jika berbeda dengan konvensi Eloquent
    protected $table = 'latihan';  // Pastikan ini sesuai dengan nama tabel di database
    protected $fillable = ['id_submateri', 'pertanyaan', 'opsi_a', 'opsi_b', 'opsi_c', 'opsi_d', 'jawaban_benar'];

    public function submateri()
    {
        return $this->belongsTo(Submateri::class);
    }
}
