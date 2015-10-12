<?php


class AuthController extends BaseController {

    public function login()
    {
        // validate the info, create rules for the inputs

        if (!Input::has('username')) {
            $error_response = array(
                'error' => array(
                    'message' => 'Missing field: username.',
                    'type' => 'OAuthException',
                    'code' => 400
                )
            );
            return Response::json($error_response, 400)->setCallback(Input::get('callback'));
        }

        if (!Input::has('password')) {
            $error_response = array(
                'error' => array(
                    'message' => 'Missing field: password.',
                    'type' => 'OAuthException',
                    'code' => 400
                )
            );
            return Response::json($error_response, 400)->setCallback(Input::get('callback'));
        }

        $username = Input::get('username');
        $password = Input::get('password');


        $input = Input::all();
        $rules = array(
            'username'    => 'required', // make sure the email is an actual email
            'password' => 'required|alphaNum|min:3' // password can only be alphanumeric and has to be greater than 3 characters
        );
        $messages = [
            'username.exists' => 'Account does not exist.'
        ];

        // run the validation rules on the inputs from the form
        $validator = Validator::make($input,$rules,$messages);

        // if the validator fails, redirect back to the form
        if ($validator->fails()) {
//            return Redirect::to('admin')
//                ->withErrors($validator) // send back all errors to the login form
//                ->withInput(Input::except('password')); // send back the input (not the password) so that we can repopulate the form
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
        else {

            // create our user data for the authentication
            $user_data = array(
                'username' => $username,
                'password' => $password
            );

            // attempt to do the login
            if (Auth::attempt($user_data, false)) {

                // validation successful!
                return $this->get();
            } else {
                $error_response = array(
                    'error' => array(
                        'message' => 'Invalid username or password.',
                        'type' => 'OAuthException',
                        'code' => 400
                    )
                );
                return Response::json($error_response, 400)->setCallback(Input::get('callback'));

            }
        }

    }

    public function get()
    {
        $user_id = false;
        if (Auth::check()) {
            // Authenticating A User And "Remembering" Them
            $user_id = Auth::user()->id;
            if(Auth::user()->accountType == 0){
                if(Session::has('admin_session'))
                    Log::info("admin_session already created before");
                else{
                    Session::put('admin_session', $user_id);
                    Log::info("admin_session created");
                }

            }
            Log::info("Session cre8 - " . Session::get('admin_session'));
        }
//        else if (Auth::viaRemember()) {
//            // Determining If User Authed Via Remember
//            $user_id = Auth::user()->id;
//        }

        if (!$user_id) {
            $error_response = array(
                'error' => array(
                    'message' => 'User not logged in.',
                    'type' => 'OAuthException',
                    'code' => 400
                )
            );
            return Response::json($error_response, 400)->setCallback(Input::get('callback'));
        }

        $user = User::find(Auth::user()->id);

        return Response::json($user)->setCallback(Input::get('callback'));
    }

    public function logout(){
        if(Session::flush()){
            $error_response = array(
                'error' => array(
                    'message' => 'Session removed.',
                    'code' => 200
                )
            );

        }
        else
            $error_response = array(
                'error' => array(
                    'message' => 'Server is busy. Try again',
                    'code' => 400
                )
            );

        return Response::json($error_response, 200)->setCallback(Input::get('callback'));
    }

}
