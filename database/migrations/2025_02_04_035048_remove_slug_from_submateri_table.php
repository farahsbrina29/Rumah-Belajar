<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('submateri', function (Blueprint $table) {
            $table->dropColumn('slug');
        });
    }

    public function down()
    {
        Schema::table('submateri', function (Blueprint $table) {
            $table->string('slug')->nullable()->after('nama_submateri');
        });
    }
};

