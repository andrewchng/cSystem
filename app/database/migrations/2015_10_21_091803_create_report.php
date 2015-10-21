<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReport extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('Reports', function(Blueprint $table){

            $table-> increments('reportID');
            $table-> integer('reportType')->unsigned();
            $table-> string('reportName', 100);
            $table-> string('reportedBy', 50);
            $table-> integer('contactNo');
            $table-> string('location', 100);
            $table-> dateTime('created_at');
            $table-> dateTime('updated_at');
            $table-> string('comment') -> nullabe();
            $table-> integer('isDeleted');
            $table-> dateTime('deleted_at') -> nullable();
            $table-> integer('isApproved');
            $table-> string('assignedTo', 80);
            $table-> integer('status') -> unsigned();

        });

        Schema::table('Reports', function(Blueprint $table){
            $table-> foreign('reportType')->references('reportTypeId')->on('ReportType');
            $table-> foreign('status')->references('reportStatusTypeId')->on('ReportStatusType');
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
