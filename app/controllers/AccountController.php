<?php

class AccountController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//get all
        User::all();
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

        $save = false;


        //create new
        if($agency !== null){

            $save = User::create(array(
                'username' => $username,
                'password' => Hash::make($password),
                'email' => $email,
                'accountType' => $type,
                'isDeleted' => '0',
                'updated_at' => new DateTime,
                'created_at' => new DateTime,
                'agencyID' => $agency
            ));
        }else{

            $save = User::create(array(
                'username' => $username,
                'password' => Hash::make($password),
                'email' => $email,
                'accountType' => $type,
                'isDeleted' => '0',
                'updated_at' => new DateTime,
                'created_at' => new DateTime
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
		//
	}


	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		//
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
	}


}
