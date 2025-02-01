<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Jenjang;

class JenjangController extends Controller
{
    public function index()
    {
        return response()->json(Jenjang::all());
    }
}
