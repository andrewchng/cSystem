<?php

class AgencyController extends BaseController
{
    public function create()
    {
        $name = Input::get('name');
        $add = Input::get('address');
        $tel = Input::get('tel_no');

        $input = Input::all();
        $rules = array(
            'name'    => 'required|min:1|max:50',
            'address' => 'required|min:1|max:100',
            'tel_no' => 'required|numeric|digits_between:3,11'
        );

        $validator = Validator::make($input,$rules);
        if ($validator->fails()) {
            $error_messages = $validator->messages();
            $error_response = array(
                'error' => array(
                    'message' => $error_messages->first(),
                    'type' => 'Exception',
                    'code' => 425
                )
            );
            return Response::json($error_response, 425)->setCallback(Input::get('callback'));
        }
        else {
            Agency::create(array(
                'agencyName'=>"$name", 'agencyAddress'=>"$add", 'agencyTel'=>"$tel"));

            return "Agency Created.";
        }
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
        $add = Input::get('address');
        $tel = Input::get('tel_no');

        $input = Input::all();
        $rules = array(
            'name'    => 'required|min:1|max:50',
            'address' => 'required|min:1|max:100',
            'tel_no' => 'required|numeric|digits_between:3,11'
        );

        $validator = Validator::make($input,$rules);
        if ($validator->fails()) {
            $error_messages = $validator->messages();
            $error_response = array(
                'error' => array(
                    'message' => $error_messages->first(),
                    'type' => 'Exception',
                    'code' => 425
                )
            );
            return Response::json($error_response, 425)->setCallback(Input::get('callback'));
        }
        else {
            Agency::find($id)->update(array('agencyName' => $name, 'agencyAddress' => $add, 'agencyTel' => $tel));

            return "Agency Updated.";
        }
    }

    public function delete()
    {
        $id = Input::get('id');
        $agency = Agency::find($id);
        $agency->delete();

        return "Agency Deleted.";
    }
}