<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLabsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('labs', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('uni_name');
            $table->string('location_name');
            $table->float('location_x');
            $table->float('location_y');
            $table->integer('tools_pc');
            $table->integer('tools_eeg');
            $table->integer('tools_eyetracking');
            $table->integer('tools_fmri');
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
        Schema::dropIfExists('labs');
    }
}
