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
    Schema::create('submateri', function (Blueprint $table) {
        $table->id();
        $table->foreignId('id_mata_pelajaran')->constrained('mata_pelajaran');
        $table->string('nama_submateri');
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('submateri');
    }
};
