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
            array('accountTypeName' => 'Administrator', 'isDeleted' => 0, 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

        DB::table('AccountType')->insert(
            array('accountTypeName' => 'Operator', 'isDeleted' => 0, 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

        DB::table('AccountType')->insert(
            array('accountTypeName' => 'Agency', 'isDeleted' => 0, 'updated_at' => new DateTime, 'created_at' => new DateTime)
        );

    }
}

