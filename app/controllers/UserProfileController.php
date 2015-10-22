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
        $opass = Input::get('opass');
        $npass = Input::get('npass');

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

    public function edit()
    {
        $id = Input::get('id');
        $email = Input::get('email');

        User::find($id)->update(array('email' => $email));

        return "User Profile Updated.";
    }
}