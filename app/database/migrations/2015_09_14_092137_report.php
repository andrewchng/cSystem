<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class c_Report extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('Reports', function(Blueprint $table){

            $table-> increments('reportID');
            $table-> integer('reportType');
            $table-> string('reportName', 100);
            $table-> string('reportedBy', 50);
            $table-> integer('contactNo');
            $table-> string('location', 100);
            $table-> dateTime('reportDateTime');
            $table-> string('comment');
            $table-> integer('isDeleted');
            $table-> integer('isApproved');
            $table-> string('assignedTo', 80);

        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('Reports');
	}

}
