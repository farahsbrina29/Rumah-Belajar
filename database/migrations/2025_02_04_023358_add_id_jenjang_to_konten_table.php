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
            $table->unsignedBigInteger('id_jenjang')->after('id_submateri')->nullable();
            $table->foreign('id_jenjang')->references('id')->on('jenjang')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('konten', function (Blueprint $table) {
            $table->dropForeign(['id_jenjang']);
            $table->dropColumn('id_jenjang');
        });
    }

};
