<?php

use Carbon\Carbon;

class AdminController extends BaseController {

    public function listAccountTypes(){
        $data = Accounts::all(['accountTypeName', 'accountTypeId']);

        return Response::json($data->toArray())->setCallback(Input::get('callback'));
    }

    public function listAgencies(){
        $data = Agency::all(['agencyName', 'agencyID']);


        return Response::json($data->toArray())->setCallback(Input::get('callback'));
    }


    public function accValidate($name){
        if ($name == "username"){
            if (!Input::has('username')) {
                $error_response = array(
                    'error' => array(
                        'message' => '*Missing field: username.',
                        'type' => 'OAuthException',
                        'code' => 400
                    )
                );
                return Response::json($error_response, 400)->setCallback(Input::get('callback'));
            }
            else{

                $input['username'] = Input::get('username');
                $rules = array(
                    'username'    => 'unique:users,username|min:4'
                );
                // run the validation rules on the inputs from the form
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
                    return Response::json($error_response, 400)->setCallback(Input::get('callback'));
                }

            }
        }
        elseif ($name == "password"){
            if (!Input::has('password')) {
                $error_response = array(
                    'error' => array(
                        'message' => '*Missing field: password.',
                        'type' => 'OAuthException',
                        'code' => 400
                    )
                );
                return Response::json($error_response, 400)->setCallback(Input::get('callback'));
            }
            else{
                $input['password'] = Input::get('password');
                $rules = array(
                    'password'    => 'min:4'
                );
                // run the validation rules on the inputs from the form
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
                    return Response::json($error_response, 400)->setCallback(Input::get('callback'));
                }
            }
        }
        elseif ($name == "email"){
            if (!Input::has('email')) {
                $error_response = array(
                    'error' => array(
                        'message' => '*Missing field: email.',
                        'type' => 'OAuthException',
                        'code' => 400
                    )
                );
                return Response::json($error_response, 400)->setCallback(Input::get('callback'));
            }
            else{
                $input['email'] = Input::get('email');
                $rules = array(
                    'email'    => 'email|unique:users,email'
                );
                // run the validation rules on the inputs from the form
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
                    return Response::json($error_response, 400)->setCallback(Input::get('callback'));
                }
            }
        }
    }


    public function listActivities(){
        $c_u_result = User::where(DB::raw('date(created_at)'), Carbon::today())->get();
        $u_u_result = User::where(DB::raw('date(updated_at)'), Carbon::today())->where(DB::raw('date(created_at)'), '<', DB::raw('date(updated_at)'))->get();
        $c_a_result = Agency::where(DB::raw('date(created_at)'), Carbon::today())->get();
        $u_a_result = Agency::where(DB::raw('date(updated_at)'), Carbon::today())->where(DB::raw('date(created_at)'), '<', DB::raw('date(updated_at)'))->get();
        //retrive report activities
        $c_r_result = Report::where(DB::raw('date(Reports.created_at)'), Carbon::today())->where('isDeleted', 0)
            ->leftjoin('ReportStatusType', 'ReportStatusType.reportStatusTypeId', '=', 'Reports.status')
            ->leftjoin('ReportType', 'ReportType.ReportTypeId', '=', 'Reports.ReportType')->lists('reportName', 'reportedBy', 'location', 'reportStatusTypeName', 'reportTypeName', 'Reports.created_at', 'Reports.updated_at');
        $u_r_result = Report::where(DB::raw('date(Reports.updated_at)'), Carbon::today())->where(DB::raw('date(Reports.created_at)'), '<', DB::raw('date(Reports.updated_at)'))->where('isDeleted', 0)
            ->leftjoin('ReportStatusType', 'ReportStatusType.reportStatusTypeId', '=', 'Reports.status')
            ->leftjoin('ReportType', 'ReportType.ReportTypeId', '=', 'Reports.ReportType')->lists('reportName', 'reportedBy', 'location', 'reportStatusTypeName', 'reportTypeName', 'Reports.created_at', 'Reports.updated_at');
        $d_r_result = Report::where(DB::raw('date(Reports.deleted_at)'), Carbon::today())->where('isDeleted', 1)
            ->leftjoin('ReportStatusType', 'ReportStatusType.reportStatusTypeId', '=', 'Reports.status')
            ->leftjoin('ReportType', 'ReportType.ReportTypeId', '=', 'Reports.ReportType')->lists('reportName', 'reportedBy', 'location', 'reportStatusTypeName', 'reportTypeName', 'Reports.created_at', 'Reports.updated_at');


        $result = array('users_created' => $c_u_result, 'users_updated' => $u_u_result, 'agencies_created' => $c_a_result, 'agencies_updated' => $u_a_result, 'reports_created' => $c_r_result, 'reports_updated' => $u_r_result, 'reports_deleted' => $d_r_result);


        return Response::json($result)->setCallback(Input::get('callback'));
    }


    public function accAnalysis(){
        $acc_created_months = array();
        $acc_type_created = array();

        for($i=4; $i>=0; $i--){
            $this_mon = Carbon::now()->month - $i;
            $data = User::whereMonth('created_at' , '=', $this_mon)->count();

            $this_mon_name = date("F", mktime(0, 0, 0, $this_mon, 10));

            array_push($acc_created_months, array('label' => $this_mon_name, 'value' => $data));
        }

        $admin_data  = User::where('accountType', 1)->count();
        $op_data = User::where('accountType', 2)->count();
        $ag_data = User::where('accountType', 3)->count();
        array_push($acc_type_created, array('label' => 'admin', 'value' => $admin_data));
        array_push($acc_type_created, array('label' => 'operator', 'value' => $op_data));
        array_push($acc_type_created, array('label' => 'agency', 'value' => $ag_data));



        $result= array('past_months' => $acc_created_months, 'total_acctype' => $acc_type_created);



        return Response::json($result)->setCallback(Input::get('callback'));
    }

    public function agenAnalysis(){
        $ag_created_months = array();

        for($i=4; $i>=0; $i--){
            $this_mon = Carbon::now()->month - $i;
            $data = Agency::whereMonth('created_at' , '=', $this_mon)->count();

            $this_mon_name = date("F", mktime(0, 0, 0, $this_mon, 10));

            array_push($ag_created_months, array('label' => $this_mon_name, 'value' => $data));
        }
        $result= array('past_months' => $ag_created_months);

        return Response::json($result)->setCallback(Input::get('callback'));
    }

    public function reportAnalysis(){
        $rep_cat = array();
        $rep_created_months = array();
        $rep_traffic_created_months = array();
        $rep_dengue_created_months = array();
        $pending_months = array();
        $ongoing_months = array();
        $resolved_months = array();

        $avg = 0;

        for($i=4; $i>=0; $i--){
            $this_mon = Carbon::now()->month - $i;

            $data = Report::whereMonth('created_at' , '=', $this_mon)->count();
            $data_t = Report::whereMonth('created_at' , '=', $this_mon)->where('reportType', 1)->count();
            $data_d = Report::whereMonth('created_at' , '=', $this_mon)->where('reportType', 2)->count();

            //status
            $s_data_p = Report::whereMonth('updated_at' , '=', $this_mon)->where('status', 1)->count();
            $s_data_o = Report::whereMonth('updated_at' , '=', $this_mon)->where('status', 2)->count();
            $s_data_r = Report::whereMonth('updated_at' , '=', $this_mon)->where('status', 3)->count();

            $avg += $data;
            array_push($rep_created_months, array('value' => $data));
            array_push($rep_traffic_created_months, array('value' => $data_t));
            array_push($rep_dengue_created_months, array('value' => $data_d));
            array_push($pending_months, array('value' => $s_data_p));
            array_push($ongoing_months, array('value' => $s_data_o));
            array_push($resolved_months, array('value' => $s_data_r));

        }



        $result= array('avg' => ceil($avg/5), 'past_months' => $rep_created_months,
            't_past_months' => $rep_traffic_created_months, 'd_past_months' => $rep_dengue_created_months,
            'pendin' => $pending_months, 'ongoing' => $ongoing_months, 'resolved' => $resolved_months);

        return Response::json($result)->setCallback(Input::get('callback'));
    }





}