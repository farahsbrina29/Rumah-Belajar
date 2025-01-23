<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateLatihanTable extends Migration
{
    public function up()
    {
        Schema::create('latihan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_submateri')->constrained('submateri')->onDelete('cascade');
            $table->text('pertanyaan');
            $table->string('opsi_a');
            $table->string('opsi_b');
            $table->string('opsi_c');
            $table->string('opsi_d');
            $table->char('jawaban_benar', 1); // 'a', 'b', 'c', or 'd'
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('latihan');
    }
}
