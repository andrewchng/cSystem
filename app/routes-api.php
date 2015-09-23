<?php
/**
 * Created by PhpStorm.
 * User: Ernie
 * Date: 17/9/15
 * Time: 3:43 PM
 */

//GET

//Route::get('/dashboard', array('before' => 'auth.required', 'uses' => 'AdminCOntroller@getDashboard'));

Route::get('/auth', 'AuthController@get');
//POST
Route::post('/auth/login', 'AuthController@login');
