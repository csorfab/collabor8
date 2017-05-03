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
            $table->text('description');
            $table->integer('numberOfParticipants');
            $table->date('availabilityFrom');
            $table->date('availabilityTill');
            $table->json('location');
            $table->string('testMethods')->nullable();
            $table->string('devices')->nullable();
            $table->string('payment');
            $table->string('languageNative');
            $table->string('languageSecond')->nullable();
            $table->string('additional')->nullable();
            $table->integer('user_id');
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
        Schema::dropIfExists('offers');
    }
}
