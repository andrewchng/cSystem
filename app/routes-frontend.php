<?php


//routes
$route_padding = '/';
Route::get($route_padding, 'HomeController@displayMap');
Route::get($route_padding . 'login', array('before' => '', 'uses' => 'FrontendController@login_masterView'));//protected admin page

//protected
Route::group(array('before' => ''), function()
{
    Route::get('/admin', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
    Route::get('/accounts/create', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
    Route::get('/reports', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
});


Route::get($route_padding . 'operator', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
Route::get($route_padding . 'create_report', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
Route::get($route_padding . 'manage_incident', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));


