<?php

class LoginController extends BaseController {

    /*
    |--------------------------------------------------------------------------
    | Default Home Controller
    |--------------------------------------------------------------------------
    |
    | You may wish to use controllers instead of, or in addition to, Closure
    | based routes. That's great! Here is an example controller method to
    | get you started. To route to this controller, just add the route:
    |
    |	Route::get('/', 'HomeController@showWelcome');
    |
    */

    public function getLogin()
    {
//        if (Auth::check()) {
//            return View::make('dashboard');
//        }

        return View::make('login');
    }

    public function postLogin()
    {
        // validate the info, create rules for the inputs

//        if (!Input::has('username')) {
//            $error_response = array(
//                'error' => array(
//                    'message' => 'Missing field: username.',
//                    'type' => 'OAuthException',
//                    'code' => 400
//                )
//            );
//            return Response::json($error_response, 400)->setCallback(Input::get('callback'));
//        }
//
//        if (!Input::has('password')) {
//            $error_response = array(
//                'error' => array(
//                    'message' => 'Missing field: password.',
//                    'type' => 'OAuthException',
//                    'code' => 400
//                )
//            );
//            return Response::json($error_response, 400)->setCallback(Input::get('callback'));
//        }



        $rules = array(
            'username'    => 'required', // make sure the email is an actual email
            'password' => 'required|alphaNum|min:3' // password can only be alphanumeric and has to be greater than 3 characters
        );

        // run the validation rules on the inputs from the form
        $validator = Validator::make(Input::all(), $rules);

        // if the validator fails, redirect back to the form
        if ($validator->fails()) {
            return Redirect::to('admin')
                ->withErrors($validator) // send back all errors to the login form
                ->withInput(Input::except('password')); // send back the input (not the password) so that we can repopulate the form

        }
        else {

            // create our user data for the authentication
            $userdata = array(
                'username' => Input::get('username'),
                'password' => Input::get('password')
            );

            // attempt to do the login
            if (Auth::attempt($userdata, true)) {

                // validation successful!
                // redirect them to the secure section or whatever

                return View::make('dashboard');

            } else {
//                $validator->errors()->add('auth', 'Wrong username or password!');
                // validation not successful, send back to form
                return Redirect::to('admin');

            }
        }


    }

}
