<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Admin; // Pastikan model Admin diimpor

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Pastikan user terautentikasi
        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        // Periksa apakah user adalah admin di tabel Admin
        $admin = Admin::where('user_id', Auth::id())->first(); // Asumsikan ada relasi user_id di tabel Admin
        if (!$admin) {
            return response()->json(['message' => 'Forbidden: Access denied'], 403);
        }

        // Jika admin, lanjutkan permintaan
        return $next($request);
    }
}
