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
    Route::get('/accounts/list', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
    Route::get('/accounts/edit/{id}', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
    Route::get('/reports/list', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
    Route::get('/agency/add', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
    Route::get('/agency/list', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
});

Route::get($route_padding . '/user/profile', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
Route::get($route_padding . '/agency/edit', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
Route::get($route_padding . 'operator', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
Route::get($route_padding .'operator/create_report', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
Route::get($route_padding .'operator/manage_report', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
Route::get($route_padding .'report/edit', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));
Route::get($route_padding . 'agency', array('before' => '', 'uses' => 'FrontendController@dashboard_masterView'));


