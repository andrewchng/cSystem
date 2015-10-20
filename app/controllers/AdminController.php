<?php


class AdminController extends BaseController {

    public function listAccountTypes(){
        $data = Accounts::all(['accountTypeName', 'accountTypeId']);
//        Log::INFO($data);
//        $data = Accounts::lists('accountTypeName', 'accountTypeId');

        return Response::json($data->toArray())->setCallback(Input::get('callback'));
    }

    public function listAgencies(){
        $data = Agency::all(['agencyName', 'agencyID']);


        return Response::json($data->toArray())->setCallback(Input::get('callback'));
    }


    public function accValidate($name){
        if ($name == "username"){
            if (!Input::has('username')) {
                $error_response = array(
                    'error' => array(
                        'message' => '*Missing field: username.',
                        'type' => 'OAuthException',
                        'code' => 400
                    )
                );
                return Response::json($error_response, 400)->setCallback(Input::get('callback'));
            }
            else{

                $input['username'] = Input::get('username');
                $rules = array(
                    'username'    => 'unique:users,username|alphaNum|min:4'
                );
                // run the validation rules on the inputs from the form
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
                    return Response::json($error_response, 400)->setCallback(Input::get('callback'));
                }

            }
        }
        elseif ($name == "password"){
            if (!Input::has('password')) {
                $error_response = array(
                    'error' => array(
                        'message' => '*Missing field: password.',
                        'type' => 'OAuthException',
                        'code' => 400
                    )
                );
                return Response::json($error_response, 400)->setCallback(Input::get('callback'));
            }
            else{
                $input['password'] = Input::get('password');
                $rules = array(
                    'password'    => 'min:4'
                );
                // run the validation rules on the inputs from the form
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
                    return Response::json($error_response, 400)->setCallback(Input::get('callback'));
                }
            }
        }
        elseif ($name == "email"){
            if (!Input::has('email')) {
                $error_response = array(
                    'error' => array(
                        'message' => '*Missing field: email.',
                        'type' => 'OAuthException',
                        'code' => 400
                    )
                );
                return Response::json($error_response, 400)->setCallback(Input::get('callback'));
            }
            else{
                $input['email'] = Input::get('email');
                $rules = array(
                    'email'    => 'email|unique:users,email'
                );
                // run the validation rules on the inputs from the form
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
                    return Response::json($error_response, 400)->setCallback(Input::get('callback'));
                }
            }
        }
    }


}