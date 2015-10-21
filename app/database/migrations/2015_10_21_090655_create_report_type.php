<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateReportType extends Migration {


    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ReportType', function(Blueprint $table){

            $table-> increments('reportTypeId');
            $table-> string('reportTypeName');
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
        Schema::drop('ReportType');
    }



}
