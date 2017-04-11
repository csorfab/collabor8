<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOffersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('offers', function (Blueprint $table) {
            $table->increments('id');
            $table->string('description');
            $table->integer('numberOfParticipants');
            $table->date('availabilityFrom');
            $table->date('availabilityTill');
            $table->string('locationString');
            $table->string('languages');
            $table->boolean('online');
            $table->boolean('lab');
            $table->boolean('field');
            $table->enum('type', ['pay', 'collab']);
            $table->integer('user_id');
            $table->timestamps();
        });

        DB::statement('ALTER TABLE offers ADD locationPoint POINT' );
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('offers');
    }
}
