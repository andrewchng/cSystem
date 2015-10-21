<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AccountTypeForeignKey extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
        DB::statement('ALTER TABLE `users` MODIFY `accountType` INT(11) UNSIGNED;');
        DB::statement('ALTER TABLE `users` ADD CONSTRAINT fk_account_type_id FOREIGN KEY (accountType) REFERENCES AccountType(accountTypeId);');
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
        DB::statement('ALTER TABLE `users` DROP CONSTRAINT fk_account_type_id FOREIGN KEY (accountType) REFERENCES AccountType(accountTypeId);');
	}

}
