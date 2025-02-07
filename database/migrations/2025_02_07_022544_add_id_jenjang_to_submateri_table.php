<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIdJenjangToSubmateriTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('submateri', function (Blueprint $table) {
            // Menambahkan kolom id_jenjang setelah kolom nama_submateri
            $table->unsignedBigInteger('id_jenjang')->nullable()->after('nama_submateri');
            
            // Menambahkan foreign key jika tabel jenjang memiliki primary key 'id'
            $table->foreign('id_jenjang')
                  ->references('id')
                  ->on('jenjang')
                  ->onDelete('cascade'); // atau atur sesuai kebutuhan
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
            // Pertama, hapus constraint foreign key
            $table->dropForeign(['id_jenjang']);
            // Kemudian, hapus kolomnya
            $table->dropColumn('id_jenjang');
        });
    }
}
