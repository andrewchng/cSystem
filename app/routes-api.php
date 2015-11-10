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
Route::get('/report/listPending', 'ReportController@listPending');
Route::get('/report/listOngoing', 'ReportController@listOngoing');
Route::get('/report/listResolved', 'ReportController@listResolved');


Route::get('/getActivities', 'AdminController@listActivities');
Route::get('/report/populate', 'ReportController@populate');
Route::get('/getAnalytics/accounts', 'AdminController@accAnalysis');
Route::get('/getAnalytics/agencies', 'AdminController@agenAnalysis');
Route::get('/getAnalytics/reports', 'AdminController@reportAnalysis');

Route::get('/map/{type?}/{source?}', 'MapController@index');

//POST
Route::post('/auth/login', 'AuthController@login');
Route::post('/auth/forgetpass', 'AuthController@resetPass');
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
Route::post('/report/listPending', 'ReportController@listPending');
Route::post('/report/listOngoing', 'ReportController@listOngoing');
Route::post('/report/listResolved', 'ReportController@listResolved');


Route::resource('account' ,'AccountController');
