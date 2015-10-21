<?php
/**
 * Created by PhpStorm.
 * User: Ernie
 * Date: 18/10/15
 * Time: 12:42 PM
 */

class AgencyTableSeeder extends Seeder {
    public function run()
    {

        DB::table('agency')->insert(
            array('agencyName'=>'Alliance Pest Management Pte Ltd', 'agencyAddress'=>'48 Toh Guan Rd E, Singapore 608586', 'agencyTel' => '65154646', 'created_at' => new DateTime(), 'updated_at' => new DateTime())
        );

        DB::table('agency')->insert(
            array('agencyName'=>'TP Dept', 'agencyAddress'=>'10 Ubi Avenue 3, 408865', 'agencyTel' => '65470000', 'created_at' => new DateTime(), 'updated_at' => new DateTime())
        );

    }
}