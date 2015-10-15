<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AccountType extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('AccountType', function(Blueprint $table){

            $table-> increments('accountTypeId');
            $table-> string('accountTypeName', 255)->unique();
            $table-> integer('isDeleted');
            $table-> dateTime('updated_at');
            $table-> dateTime('created_at');

        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('AccountType');
	}

}
