<?php
/**
 * Created by PhpStorm.
 * User: Ernie
 * Date: 15/10/15
 * Time: 1:22 PM
 */

class AccTypeSeeder extends Seeder
{
    public function run()
    {
        DB::table('AccountType')->insert(
            array('accountTypeName' => 'Administrator', 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

        DB::table('AccountType')->insert(
            array('accountTypeName' => 'Operator', 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

        DB::table('AccountType')->insert(
            array('accountTypeName' => 'Agency', 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

    }
}

