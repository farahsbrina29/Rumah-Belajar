<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Submateri extends Model
{
    use HasFactory;

    protected $table = 'submateri';

    protected $fillable = ['nama_submateri', 'slug', 'id_mata_pelajaran'];

    // Event untuk membuat slug otomatis sebelum menyimpan data baru
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($submateri) {
            $submateri->slug = Str::slug($submateri->nama_submateri, '-');
        });

        static::updating(function ($submateri) {
            // Hanya update slug jika nama_submateri berubah
            if ($submateri->isDirty('nama_submateri')) {
                $submateri->slug = Str::slug($submateri->nama_submateri, '-');
            }
        });
    }

    // Relasi ke model MataPelajaran
    public function mataPelajaran()
    {
        return $this->belongsTo(MataPelajaran::class, 'id_mata_pelajaran'); // Pastikan foreign key sesuai
    }

    // Relasi satu ke banyak dengan model Konten
    public function konten()
    {
        return $this->hasMany(Konten::class, 'id_submateri'); // Pastikan foreign key sesuai
    }
}
