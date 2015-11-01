<?php

use Carbon\Carbon;

class AccountController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{

        if (Input::has('order_by')) {
            $order_by = Input::get('order_by');
            $dir = 'ASC';

            if (Input::has('order_dir')) {
                $dir = Input::get('order_dir');
            }
        }
        else {
            $order_by = 'id';
            $dir = 'ASC';
        }


		if(Input::has('uid')){
            $uid = Input::get('uid');
            $accounts = User::where('id', $uid)
                ->leftjoin('AccountType', 'AccountType.accountTypeId', '=', 'users.accountType')
                ->leftjoin('Agency', 'Agency.agencyId', '=', 'users.agencyId')->orderBy($order_by, $dir)
                ->select('id', 'username', 'email', 'accountTypeName', 'agencyName', 'users.created_at as created_at', 'users.updated_at as updated_at')
                ->paginate(10);
        }
        else if(Input::has('username')){
            $user = '%' . Input::get('username') . '%';
            $accounts = User::where('username', 'LIKE', $user)
                ->leftjoin('AccountType', 'AccountType.accountTypeId', '=', 'users.accountType')
                ->leftjoin('Agency', 'Agency.agencyId', '=', 'users.agencyId')->orderBy($order_by, $dir)
                ->select('id', 'username', 'email', 'accountTypeName', 'agencyName', 'users.created_at as created_at', 'users.updated_at as updated_at')
                ->paginate(10);
        }
        else if(Input::has('email')){
            $email = '%'. Input::get('email') . '%';
            $accounts = User::where('email', 'LIKE' , $email)
                ->leftjoin('AccountType', 'AccountType.accountTypeId', '=', 'users.accountType')
                ->leftjoin('Agency', 'Agency.agencyId', '=', 'users.agencyId')->orderBy($order_by, $dir)
                ->select('id', 'username', 'email', 'accountTypeName', 'agencyName', 'users.created_at as created_at', 'users.updated_at as updated_at')
                ->paginate(10);
        }
        else if(Input::has('type')){
            $type = Input::get('type');
            $accounts = User::where('accountType', $type)
                ->leftjoin('AccountType', 'AccountType.accountTypeId', '=', 'users.accountType')
                ->leftjoin('Agency', 'Agency.agencyId', '=', 'users.agencyId')->orderBy($order_by, $dir)
                ->select('id', 'username', 'email', 'accountTypeName', 'agencyName', 'users.created_at as created_at', 'users.updated_at as updated_at')
                ->paginate(10);
        }
        else if(Input::has('agency')){
            $agency = Input::get('agency');
            $accounts = User::where('users.agencyId', $agency)
                ->leftjoin('AccountType', 'AccountType.accountTypeId', '=', 'users.accountType')
                ->join('Agency', 'Agency.agencyId', '=', 'users.agencyId')->orderBy($order_by, $dir)
                ->select('id', 'username', 'email', 'accountTypeName', 'agencyName', 'users.created_at as created_at', 'users.updated_at as updated_at')
                ->paginate(10);
        }
        else {

            $accounts = User::leftjoin('AccountType', 'AccountType.accountTypeId', '=', 'users.accountType')
                ->leftjoin('Agency', 'Agency.agencyId', '=', 'users.agencyId')->orderBy($order_by, $dir)->select('id', 'username', 'email', 'accountTypeName', 'agencyName', 'users.created_at as created_at', 'users.updated_at as updated_at')->paginate(10);
        }



        if(!$accounts){
            $error_response = array(
                'error' => array(
                    'message' => 'Nothing retrieved!',
                    'type' => 'ORetrieveException',
                    'code' => 400
                )
            );

            return Response::json($error_response, 400)->setCallback(Input::get('callback'));
        }
        else
            return Response::json($accounts)->setCallback(Input::get('callback'));



    }


	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{

//        try
//        {
//            return "hello world";
//        }
//        catch (\Exception $e)
//        {
//            dd($e);
//        }




        $username = Input::get('username');
        $password = Input::get('password');
        $email = Input::get('email');
        $type = Input::get('type');
        $agency = Input::get('agency');


        if($type === 3 && $agency === null){
            $error_response = array(
                'error' => array(
                    'message' => 'Please Select an Agency. Failed!',
                    'type' => 'OInsertException',
                    'code' => 425
                )
            );
            return Response::json($error_response, 425)->setCallback(Input::get('callback'));
        }


        //create new
        if($agency !== null){

            $save = User::create(array(
                'username' => $username,
                'password' => Hash::make($password),
                'email' => $email,
                'accountType' => $type,
                'agencyId' => $agency
            ));
        }else{

            $save = User::create(array(
                'username' => $username,
                'password' => Hash::make($password),
                'email' => $email,
                'accountType' => $type
            ));
        }

        if(!$save){
            $error_response = array(
                'error' => array(
                    'message' => 'Failed to create User',
                    'type' => 'OInsertException',
                    'code' => 500
                )
            );

            return Response::json($error_response, 500)->setCallback(Input::get('callback'));
        }
        else
            return Response::json(array('message' => 'Account created. Success!'), 200)->setCallback(Input::get('callback'));



	}


	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$account = User::find($id);

        Log::info('inside show()');

        if(!$account){
            $error_response = array(
                'error' => array(
                    'message' => 'Nothing retrieved!',
                    'type' => 'ORetrieveException',
                    'code' => 400
                )
            );

            return Response::json($error_response, 400)->setCallback(Input::get('callback'));
        }
        else
            return Response::json($account, 200)->setCallback(Input::get('callback'));

	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
        $username = Input::get('username');
        $email = Input::get('email');
        $type = Input::get('accountType');
        if(Input::has('agencyId'))
            $agency = Input::get('agencyId');

        if($type === 3 && $agency === null){
            $error_response = array(
                'error' => array(
                    'message' => 'Please Select an Agency. Failed!',
                    'type' => 'OInsertException',
                    'code' => 425
                )
            );
            return Response::json($error_response, 425)->setCallback(Input::get('callback'));
        }


        $input = Input::all();
        $rules = array(
            'username'    => 'required|unique:users,username,' .$id . '|min:4',
            'email' => 'required|email|unique:users,email,' .$id
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
        if(isset($agency))
            $account = User::find($id)->update(array('username' => $username, 'email' => $email, 'accountType' =>$type,'updated_at' => Carbon::now(), 'agencyId' => $agency));
        else
            $account = User::find($id)->update(array('username' => $username, 'email' => $email, 'accountType' =>$type,'updated_at' => Carbon::now()));

        if(!$account){
            $error_response = array(
                'error' => array(
                    'message' => 'Update Failed!',
                    'type' => 'OUpdateException',
                    'code' => 400
                )
            );

            return Response::json($error_response, 400)->setCallback(Input::get('callback'));
        }
        else
            return Response::json(array('message' => 'Account updated. Success!'), 200)->setCallback(Input::get('callback'));
	}


	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		//
        $current = Auth::id();

        if($id === $current){
            $error_response = array(
                'error' => array(
                    'message' => 'Deletion Failed! You cannot delete your own account!',
                    'type' => 'ODeleteException',
                    'code' => 400
                )
            );

            return Response::json($error_response, 400)->setCallback(Input::get('callback'));
        }


        $account = User::find($id)->delete();


        if(!$account){
            $error_response = array(
                'error' => array(
                    'message' => 'Deletion Failed!',
                    'type' => 'ODeleteException',
                    'code' => 400
                )
            );

            return Response::json($error_response, 400)->setCallback(Input::get('callback'));
        }
        else
            return Response::json(array('message' => 'Account deleted. Success!'), 200)->setCallback(Input::get('callback'));
	}

    public function resetPass($id){
        $new_pass = Input::get('pass');

        User::find($id)->update(array('password'=>Hash::make($new_pass)));

        return Response::json(array('message' => 'Password resetted to <b>' . $new_pass . '</b> Success!'), 200)->setCallback(Input::get('callback'));
    }



}
