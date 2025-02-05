<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('konten', function (Blueprint $table) {
            $table->unsignedBigInteger('id_mata_pelajaran')->nullable()->after('id_jenjang');
            $table->foreign('id_mata_pelajaran')->references('id')->on('mata_pelajaran')->onDelete('cascade');
        });
    }
    

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('konten', function (Blueprint $table) {
            //
        });
    }
};
