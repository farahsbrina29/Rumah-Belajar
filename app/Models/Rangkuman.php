<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Rangkuman extends Model
{
    use HasFactory;

    protected $fillable = ['id_submateri', 'file_rangkuman'];

    public function submateri()
    {
        return $this->belongsTo(Submateri::class);
    }
}
