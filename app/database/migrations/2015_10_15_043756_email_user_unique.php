<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class EmailUserUnique extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        DB::statement('ALTER TABLE `users` MODIFY `username` VARCHAR(100)  UNIQUE;');
        DB::statement('ALTER TABLE `users` MODIFY `email` VARCHAR(100)  UNIQUE;');
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        DB::statement('ALTER TABLE `users` MODIFY `username` VARCHAR(100)  NOT UNIQUE;');
        DB::statement('ALTER TABLE `users` MODIFY `email` VARCHAR(100)  NOT UNIQUE;');
	}

}
