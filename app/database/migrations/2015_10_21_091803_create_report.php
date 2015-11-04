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
            $table-> string('comment') -> nullable();
            $table-> integer('isDeleted');
            $table->softDeletes();
            //$table-> dateTime('deleted_at') -> nullable();
            $table-> integer('isApproved');
            $table-> integer('assignedTo') -> unsigned();
            $table-> integer('status') -> unsigned();
            $table-> timestamps();

        });

        Schema::table('Reports', function(Blueprint $table){
            $table-> foreign('reportType')->references('reportTypeId')->on('ReportType');
            $table-> foreign('status')->references('reportStatusTypeId')->on('ReportStatusType');
            $table-> foreign('assignedTo')->references('agencyId')->on('Agency');
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
