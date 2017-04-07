<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
	
	
	
	
	
	/**
	* Run the migrations.
					     *
					     * @return void
					     */
					    public function up()
					    {
		Schema::create('users', function (Blueprint $table) {
			$table->increments('id');
			$table->integer('lab_id')->nullable();
			$table->string('name');
			$table->string('email')->unique();
			$table->string('password');
			$table->enum('auth_type', ['collabor8', 'fb', 'google', 'academia.edu']);
			
			//W			E CACHE THIS TO SKIP SERVERSIDE GOOGLE API CALL
						$table->text('auth_token')->nullable();
			
			//U			NIQUE USER ID SUCH AS GOOGLE ID (ex.: 114166766152272042098)
						$table->string('auth_id');
			
			$table->string('fields_of_expertise')->default('');
			$table->string('academic_titles')->default('');
			$table->rememberToken();
			$table->timestamps();
			
			$table->index('auth_id');
		}
		);
	}
	
	
	
	
	
	
	/**
	* Reverse the migrations.
					     *
					     * @return void
					     */
					    public function down()
					    {
		Schema::dropIfExists('users');
	}
}
