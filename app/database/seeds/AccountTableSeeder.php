<?php
/**
 * Created by PhpStorm.
 * User: Ernie
 * Date: 16/9/15
 * Time: 12:26 AM
 */

class AccountTableSeeder extends Seeder
{

    public function run()
    {
//        DB::table('Accounts')->delete();
        $accounts = array(
            'username' => 'admin',
            'password' => Hash::make('admin'),
            'email'    => 'admin@ssad',
            'accountType' => '0',
            'isDeleted' => '0',
            'createdAt' => new DateTime
        );
        DB::table('Accounts')->insert($accounts);
    }

}