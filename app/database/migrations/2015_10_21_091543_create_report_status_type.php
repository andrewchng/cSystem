<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportStatusType extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        Schema::create('ReportStatusType', function(Blueprint $table){

            $table-> increments('reportStatusTypeId');
            $table-> string('reportStatusTypeName');
            $table-> dateTime('created_at');
            $table-> dateTIme('updated_at');

        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        Schema::drop('ReportStatusType');
	}

}
