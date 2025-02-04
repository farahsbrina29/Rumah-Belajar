<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rangkuman extends Model
{
    use HasFactory;
    

    // Menentukan nama tabel yang benar jika berbeda dengan konvensi Eloquent
    protected $table = 'rangkuman';  // Pastikan ini sesuai dengan nama tabel di database

    protected $fillable = ['id_submateri', 'file_rangkuman'];

    public function submateri()
    {
        return $this->belongsTo(Submateri::class);
    }
}
