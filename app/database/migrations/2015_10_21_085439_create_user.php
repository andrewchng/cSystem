<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUser extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('users', function(Blueprint $table){

            $table-> increments('id');
            $table-> string('username', 100)->unique();
            $table-> string('password');
            $table-> string('email', 100)->unique();
            $table-> integer('accountType')->unsigned();
            $table-> dateTime('updated_at');
            $table-> dateTime('created_at');
            $table-> integer('agencyId')->unsigned()->nullable();
        });

        Schema::table('users', function(Blueprint $table){
            $table-> foreign('agencyId')->references('agencyId')->on('Agency');
            $table-> foreign('accountType')->references('accountTypeId')->on('AccountType');
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
