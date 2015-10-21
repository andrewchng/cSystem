<?php

class AgencyController extends BaseController
{
    public function create()
    {
        $name = Input::get('name');
        $add = Input::get('add');
        $tel = Input::get('tel');

        Agency::create(array(
            'agencyName'=>"$name", 'agencyAddress'=>"$add", 'agencyTel'=>"$tel"));

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

        Agency::find($id)->update(array('agencyName' => $name, 'agencyAddress' => $add, 'agencyTel' => $tel));

        return "Agency Updated.";
    }

    public function delete()
    {
        //Soft Delete
        $id = Input::get('id');
        $agency = Agency::find($id);
        $agency->delete();

        return "Agency Deleted.";
    }
}