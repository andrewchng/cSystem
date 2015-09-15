<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class User extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('users', function(Blueprint $table){

            $table-> increments('id');
            $table-> string('username', 100);
            $table-> string('password');
            $table-> string('email', 100);
            $table-> integer('accountType');
            $table-> integer('isDeleted');
            $table-> dateTime('updated_at');
            $table-> dateTime('created_at');
            $table-> string('remember_token')->nullable();
            $table-> integer('agencyID')->unsigned()->nullable();
        });

        Schema::table('users', function(Blueprint $table){
            $table-> foreign('agencyID')->references('agencyID')->on('Agency');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('users');
	}

}
