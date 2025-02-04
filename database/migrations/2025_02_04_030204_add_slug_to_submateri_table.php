<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('submateri', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('nama_submateri');
        });

        // Isi slug untuk data yang sudah ada sebelum menambahkan unique constraint
        DB::statement("UPDATE submateri SET slug = LOWER(REPLACE(nama_submateri, ' ', '-')) WHERE slug IS NULL");

        Schema::table('submateri', function (Blueprint $table) {
            $table->string('slug')->unique()->change();
        });
    }

    public function down(): void
    {
        Schema::table('submateri', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
