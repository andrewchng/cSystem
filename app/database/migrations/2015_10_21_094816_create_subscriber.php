<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateSubscriber extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('Subscribers', function(Blueprint $table){

            $table-> increments('subscriberId');
            $table-> string('subscriberName', 255);
            $table-> string('subscriberEmail', 255);
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
        Schema::drop('Subscribers');
	}

}
