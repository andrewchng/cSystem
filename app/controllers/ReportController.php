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

        Report::create(
            array('reportName'=>"$reportName",'reportType'=>"$reportType",'location'=>"$location",'contactNo'=>"$contactNo",'reportedBy'=>"$reportedBy","status"=>1, 'assignedTo'=>"$assignedTo"));
    }

    public function listing()
    {
        $report = DB::table('reports')
            ->join('reportstatustype', 'reports.status', '=', 'reportstatustype.reportStatusTypeId')
            ->join('reporttype', 'reports.reportType', '=', 'reporttype.reportTypeId')
            ->join('agency', 'reports.assignedTo', '=', 'agency.agencyId')
            ->select('reports.*', 'reportstatustype.reportStatusTypeName', 'reporttype.reportTypeName','agency.agencyName')
            ->get();

        return json_encode($report);
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

        Report::where('reportID', $reportID)->update(
            array('reportName'=>"$reportName",'reportType'=>"$reportType",'location'=>"$location",'contactNo'=>"$contactNo",'reportedBy'=>"$reportedBy", 'assignedTo'=>"$assignedTo"));
    }

    public function updateStatus()
    {
        $reportID = Input::get('reportID');
        $comment = Input::get('comment');
        $status = Input::get('status');

        Report::where('reportID', $reportID)->update(array('comment'=>"$comment",'status'=>"$status"));
    }

    public function listReportTypes(){
        $data = DB::table('ReportType')->get();


        return Response::json($data)->setCallback(Input::get('callback'));
    }

}
