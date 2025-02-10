<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('konten', function (Blueprint $table) {
            $table->string('jenis_konten')->after('deskripsi')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('konten', function (Blueprint $table) {
            $table->dropColumn('jenis_konten');
        });
    }
};

