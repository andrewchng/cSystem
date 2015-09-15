<?php
/**
 * Created by PhpStorm.
 * User: Ernie
 * Date: 16/9/15
 * Time: 3:36 AM
 */
class UserTableSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->delete();
        User::create(array(
            'username' => 'admin',
            'password' => Hash::make('admin'),
            'email' => 'admin@ssad',
            'accountType' => '0',
            'isDeleted' => '0'
        ));

    }
}

