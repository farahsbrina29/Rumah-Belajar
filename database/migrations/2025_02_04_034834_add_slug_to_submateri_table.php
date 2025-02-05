<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('submateri', function (Blueprint $table) {
            $table->string('slug')->unique()->after('nama_submateri'); // Pastikan kolom ada
        });
    }
    
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('submateri', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }
};
