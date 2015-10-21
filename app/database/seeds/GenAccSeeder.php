<?php
use Faker\Factory as Faker;


class GenAccSeeder extends Seeder {
    public function run()
    {
        $faker = Faker::create();
        $accType = Accounts::all()->lists('accountTypeId');
        $agency = Agency::all()->lists('agencyId');

        foreach(range(1,20) as $index){
            $atype = $faker->randomElement($accType);
            Log::info($atype);
            if($atype == 3) {
                $agen = $faker->randomElement($agency);
                User::create(array(
                    'username' => str_replace('.', '_', $faker->unique()->username),
                    'password' => Hash::make('admin'),
                    'email' => $faker->email,
                    'accountType' => $atype,
                    'updated_at' => new DateTime,
                    'created_at' => new DateTime,
                    'agencyId' => $agen
                ));
            }else{
                User::create(array(
                    'username' => str_replace('.', '_', $faker->unique()->username),
                    'password' => Hash::make('admin'),
                    'email' => $faker->email,
                    'accountType' => $atype,
                    'updated_at' => new DateTime,
                    'created_at' => new DateTime
                ));
            }
        }



    }

}