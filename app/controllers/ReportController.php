<?php

class ReportController extends BaseController
{
    public function create()
    {
        $reportName = Input::get('reportName');
        $location = Input::get('location');
        $reportType = Input::get('reportType');
        $contactNo = Input::get('contactNo');
        $reportedBy = Input::get('reportedBy');
        $assignedTo = Input::get('assignedTo');
        $description = Input::get('description');

        $input = Input::all();
        $rules = array(
            'reportName'  => 'required|min:1|max:100',
            'location' => 'required|max:100',
            'reportType' =>'required|numeric',
            'assignedTo' =>'required|numeric',
            'contactNo' =>'required|numeric|digits_between:3,11',
            'reportedBy'=>'required|max:50',
            'description' => 'max:255'

        );

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
            return Response::json($error_response, 425)->setCallback(Input::get('callback'));
        }
        else {
            Report::create(
                array('reportName'=>"$reportName",'reportType'=>"$reportType",'location'=>"$location",'contactNo'=>"$contactNo",'reportedBy'=>"$reportedBy","status"=>1, 'assignedTo'=>"$assignedTo", 'description'=>"$description"));
            return "Report Created.";
        }


    }

    public function listing()
    {
        $report = DB::table('reports')
            ->join('reportstatustype', 'reports.status', '=', 'reportstatustype.reportStatusTypeId')
            ->join('reporttype', 'reports.reportType', '=', 'reporttype.reportTypeId')
            ->join('agency', 'reports.assignedTo', '=', 'agency.agencyId')
            ->select('reports.*', 'reportstatustype.reportStatusTypeName', 'reporttype.reportTypeName','agency.agencyName',DB::raw('CASE WHEN isApproved=0 THEN "No" ELSE "Yes" END AS isApprovedS'))
            ->orderBy('reportID','ASC')
            ->get();

        return json_encode($report);
    }

    //Retreive pending Reports that are not deleted
    public function listPending()
    {
        $report = DB::table('reports')
            ->join('reportstatustype', 'reports.status', '=', 'reportstatustype.reportStatusTypeId')
            ->join('reporttype', 'reports.reportType', '=', 'reporttype.reportTypeId')
            ->join('agency', 'reports.assignedTo', '=', 'agency.agencyId')
            ->select('reports.*', 'reportstatustype.reportStatusTypeName', 'reporttype.reportTypeName','agency.agencyName',DB::raw('CASE WHEN isApproved=0 THEN "No" ELSE "Yes" END AS isApprovedS'))
            ->where('isDeleted','=', 0)
            ->Where('status','=',1)
            ->orderBy('reportID','ASC')
            ->get();

        return json_encode($report);
    }
    //Retreive ongoing Reports that are not deleted
    public function listOngoing()
    {
        $report = DB::table('reports')
            ->join('reportstatustype', 'reports.status', '=', 'reportstatustype.reportStatusTypeId')
            ->join('reporttype', 'reports.reportType', '=', 'reporttype.reportTypeId')
            ->join('agency', 'reports.assignedTo', '=', 'agency.agencyId')
            ->select('reports.*', 'reportstatustype.reportStatusTypeName', 'reporttype.reportTypeName','agency.agencyName',DB::raw('CASE WHEN isApproved=0 THEN "No" ELSE "Yes" END AS isApprovedS'))
            ->where('isDeleted','=', 0)
            ->Where('status','=',2)
            ->orderBy('reportID','ASC')
            ->get();

        return json_encode($report);
    }
    //Retreive resolved Reports that are not deleted
    public function listResolved()
    {
        $report = DB::table('reports')
            ->join('reportstatustype', 'reports.status', '=', 'reportstatustype.reportStatusTypeId')
            ->join('reporttype', 'reports.reportType', '=', 'reporttype.reportTypeId')
            ->join('agency', 'reports.assignedTo', '=', 'agency.agencyId')
            ->select('reports.*', 'reportstatustype.reportStatusTypeName', 'reporttype.reportTypeName','agency.agencyName',DB::raw('CASE WHEN isApproved=0 THEN "No" ELSE "Yes" END AS isApprovedS'))
            ->where('isDeleted','=', 0)
            ->Where('status','=',3)
            ->orderBy('reportID','ASC')
            ->get();

        return json_encode($report);
    }

    public function listStatus()
    {
        $ReportStatusType = DB::table('ReportStatusType')->get();

        return json_encode($ReportStatusType);
    }

    public function delete()
    {
        $reportID = Input::get('reportID');
        $delReport = Report::find($reportID);
        Report::where('reportID', $reportID)->update(
            array('isDeleted'=> 1)
        );
        $delReport->delete();
    }


    public function populate()
    {
        $reportID = Input::get('reportID');
        $editReport = Report::find($reportID);

        return $editReport->toJson();
    }

    public function update()
    {
        $reportID = Input::get('reportID');
        $reportName = Input::get('reportName');
        $location = Input::get('location');
        $reportType = Input::get('reportType');
        $contactNo = Input::get('contactNo');
        $reportedBy = Input::get('reportedBy');
        $assignedTo = Input::get('assignedTo');
        $description = Input::get('description');


        $input = Input::all();
        $rules = array(
            'reportName'  => 'required|max:100',
            'location' => 'required|max:100',
            'reportType' =>'numeric',
            'assignedTo' =>'numeric',
            'contactNo' =>'required|numeric|digits_between:3,11',
            'reportedBy'=>'required|max:50',
            'description' => 'max:255'
        );


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
            return Response::json($error_response, 425)->setCallback(Input::get('callback'));
        }
        else {
            Report::where('reportID', $reportID)->update(
                array('reportName'=>"$reportName",'reportType'=>"$reportType",'location'=>"$location",'contactNo'=>"$contactNo",'reportedBy'=>"$reportedBy", 'assignedTo'=>"$assignedTo", 'description'=>"$description"));

            return "Report Updated.";
        }

    }

    public function updateStatus()
    {
        $reportID = Input::get('reportID');
        $comment = Input::get('comment');
        $status = Input::get('status');

        $input = Input::all();
        $rules = array(
            'Status'=>'numeric',
            'comment' => 'max:255'
        );

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
            return Response::json($error_response, 425)->setCallback(Input::get('callback'));
        }
        else {
            Report::where('reportID', $reportID)->update(array('comment'=>"$comment",'status'=>"$status"));

            return "Report Updated.";
        }

    }

    public function listReportTypes(){
        $data = DB::table('ReportType')->get();

        return Response::json($data)->setCallback(Input::get('callback'));
    }

}
