<?php
/**
 * Created by PhpStorm.
 * User: Ernie
 * Date: 10/11/15
 * Time: 4:31 PM
 */

use Faker\Factory as Faker;


class GenSubSeeder extends Seeder {
    public function run()
    {
        $faker = Faker::create();

        foreach(range(1,30) as $index){

            $created = $faker->dateTimeThisYear;

            Subscriber::create(array(
                'subscriberName' => $faker->name,
                'subscriberEmail' => $faker->email,
                'created_at' => $created
            ));

        }



    }

}