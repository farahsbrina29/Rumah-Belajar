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
    Schema::create('konten', function (Blueprint $table) {
        $table->id();
        $table->foreignId('id_submateri')->constrained('submateri')->onDelete('cascade'); // Menambahkan foreign key ke tabel submateri
        $table->string('judul_konten');
        $table->text('deskripsi');
        $table->string('thumbnail')->nullable(); // Menyimpan URL gambar thumbnail
        $table->string('link_konten'); // Menyimpan URL atau link konten
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
        Schema::dropIfExists('konten');
    }
};
