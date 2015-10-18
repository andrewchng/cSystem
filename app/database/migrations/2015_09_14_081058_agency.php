<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class c_Agency extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('Agency', function(Blueprint $table) {
            $table->increments('agencyID');
            $table->string('agencyName', 50);
            $table->string('agencyAddress', 100);
            $table->integer('agencyTel');
            $table->integer('isDeleted');
            $table->dateTime('createdAt');
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('Agency');
	}

}
