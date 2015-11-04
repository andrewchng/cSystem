<?php
/**
 * Created by PhpStorm.
 * User: Ernie
 * Date: 17/9/15
 * Time: 3:43 PM
 */

//GET


Route::get('/auth', 'AuthController@get');
Route::get('/auth/logout', 'AuthController@logout');
Route::get('/getAccount_T', 'AdminController@listAccountTypes');
Route::get('/getReport_T', 'ReportController@listReportTypes');
Route::get('/listAgencies', 'AdminController@listAgencies');
Route::get('/agency/list', 'AgencyController@listing');
Route::get('/report/list', 'ReportController@listing');
Route::get('/report/listStatus', 'ReportController@listStatus');

Route::get('/getActivities', 'AdminController@listActivities');
Route::get('/report/populate', 'ReportController@populate');
Route::get('/getAnalytics/accounts', 'AdminController@accAnalysis');
Route::get('/getAnalytics/agencies', 'AdminController@agenAnalysis');
Route::get('/getAnalytics/reports', 'AdminController@reportAnalysis');

Route::get('/map/dengue/ext', 'OneMapParser@getExternalData');
Route::get('/map/dengue/local', 'OneMapParser@getLocalData');
Route::resource('/map/dengue', 'OneMapParser');

Route::get('/map/traffic/ext', 'LTAParser@getExternalData');
Route::get('/map/traffic/local', 'LTAParser@getLocalData');
Route::resource('/map/traffic', 'LTAParser');

//POST
Route::post('/auth/login', 'AuthController@login');
Route::post('/user/changepass', 'UserProfileController@changePass');
Route::post('/user/populate', 'UserProfileController@populate');
Route::post('/user/edit', 'UserProfileController@edit');
Route::post('/account/validate/{name}', 'AdminController@accValidate');
Route::post('/agency/create', 'AgencyController@create');
Route::post('/agency/populate', 'AgencyController@populate');
Route::post('/agency/edit', 'AgencyController@edit');
Route::post('/agency/delete', 'AgencyController@delete');
Route::post('/account/resetpass/{id}', 'AccountController@resetPass');
Route::post('/report/create', 'ReportController@create');
Route::post('/report/delete', 'ReportController@delete');
Route::post('/report/populate', 'ReportController@populate');
Route::post('/report/update', 'ReportController@update');
Route::post('/report/updateStatus', 'ReportController@updateStatus');


Route::resource('account' ,'AccountController');
