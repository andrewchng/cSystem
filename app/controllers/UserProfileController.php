<?php

class UserProfileController extends BaseController
{
    public function populate() {
        $id = Input::get('id');

        $user = User::find($id);
        $accountType = DB::table('accounttype')
            ->select('accountTypeName')
            ->where('accountTypeId', '=', $user->accountType)
            ->pluck('accountTypeName');
        $user->accountType = $accountType;
        if($user->agencyId == null){
            $user->agencyId = "No Agency";
        }
        else {
            $agencyName = Agency::find($user->agencyId);
            $user->agencyId = $agencyName->agencyName;
        }

        return $user->toJson();
    }

    public function changePass() {
        $id = Input::get('id');
        $opass = Input::get('old_password');
        $npass = Input::get('new_password');

        $input = Input::all();
        $rules = array(
            'old_password'    => 'required|min:1|max:50',
            'new_password' => 'required|min:1|max:50'
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
            $user = User::find($id);
            if($user) {
                if (Hash::check($opass, $user->password)){
                    $npass = Hash::make($npass);
                    User::find($id)->update(array('password' => $npass));
                    return "Password Changed.";
                }
                else {
                    return "Wrong Old Password.";
                }
            }
        }
    }

    public function edit()
    {
        $id = Input::get('id');
        $email = Input::get('email');

        $input = Input::all();
        $rules = array(
            'email'    => 'required|min:5|max:100|email'
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
            User::find($id)->update(array('email' => $email));

            return "User Profile Updated.";
        }
    }
}