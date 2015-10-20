<?php

class AgencyController extends BaseController
{
    public function create()
    {
        $name = Input::get('name');
        $add = Input::get('add');
        $tel = Input::get('tel');

        DB::table('agency')->insert(
            ['agencyName'=>"$name", 'agencyAddress'=>"$add", 'agencyTel'=>"$tel" , 'isDeleted'=> 0, 'createdAt'=> new DateTime]);

        //Eloquent Create Method cannot work for me
        /*Agency::create(array(
            'agencyName'=>"$name", 'agencyAddress'=>"$add", 'agencyTel'=>"$tel" , 'isDeleted'=> 0, 'createdAt'=> new DateTime));*/

        return "Agency Created.";
    }

    public function listing()
    {
        $agency = Agency::all();
        return $agency->toJson();
    }

    public function populate()
    {
        $id = Input::get('id');
        $agency = Agency::find($id);

        return $agency->toJson();
    }

    public function edit()
    {
        $id = Input::get('id');
        $name = Input::get('name');
        $add = Input::get('add');
        $tel = Input::get('tel');

        DB::table('agency')
            ->where('agencyID', $id)
            ->update(['agencyName' => $name, 'agencyAddress' => $add, 'agencyTel' => $tel]);

        return "Agency Updated.";
    }

    public function delete()
    {
        //Soft Delete
        $id = Input::get('id');
        DB::table('agency')
            ->where('agencyID', $id)
            ->update(['isDeleted' => 1]);

        return "Agency Deleted.";
    }
}