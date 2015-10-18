<?php

class AgencyController extends BaseController
{
    public function create()
    {
        $name = Input::get('name');
        $add = Input::get('add');
        $tel = Input::get('tel');
        $date = date('Y-m-d H:i:s');

        DB::table('agency')->insert(
            ['agencyName'=>"$name", 'agencyAddress'=>"$add", 'agencyTel'=>"$tel" , 'isDeleted'=> 0, 'createdAt'=> "$date"]);
    }

    public function listing()
    {
        $agency = Agency::all();
        return $agency->toJson();
    }
}