<?php


//routes
$route_padding = '/';
Route::get($route_padding, 'HomeController@showWelcome');
Route::get($route_padding . 'login', array('before' => '', 'uses' => 'FrontendController@masterView'));
//Route::get($route_padding . 'admin/dashboard', array('before' => 'auth.required', 'uses' => 'FrontendController@view'));
