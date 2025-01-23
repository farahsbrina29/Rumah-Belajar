<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRangkumanTable extends Migration
{
    public function up()
    {
        Schema::create('rangkuman', function (Blueprint $table) {
            $table->id();
            $table->foreignId('id_submateri')->constrained('submateri')->onDelete('cascade');
            $table->string('file_rangkuman');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('rangkuman');
    }
}
