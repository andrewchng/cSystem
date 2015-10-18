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

        $data = array(
            array('agencyName'=>'Alliance Pest Management Pte Ltd', 'agencyAddress'=>'48 Toh Guan Rd E, Singapore 608586', 'agencyTel' => '6515 4646', 'isDeleted' => '0', 'createdAt' => new DateTime()),
            array('agencyName'=>'TP Dept', 'agencyAddress'=>'10 Ubi Avenue 3, 408865', 'agencyTel' => '6547 0000', 'isDeleted' => '0', 'createdAt' => new DateTime())

        );

        Agency::insert($data);

    }
}