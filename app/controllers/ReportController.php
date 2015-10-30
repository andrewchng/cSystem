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

        Report::create(array(
            'reportName'=>"$reportName",'reportType'=>"$reportType",'location'=>"$location",'contactNo'=>"$contactNo",'reportedBy'=>"$reportedBy","status"=>1));
    }

    public function listing()
    {
        $report = Report::all();
        return $report->toJson();
    }

    public function delete()
    {
        $reportID = Input::get('reportID');
        $delReport = Report::find($reportID);
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
//        $comment = Input::get('comment');
//        $status = Input::get('status');

        Report::where('reportID', $reportID)
                ->update(array(
                    'reportName'=>"$reportName",'reportType'=>"$reportType",'location'=>"$location",'contactNo'=>"$contactNo",'reportedBy'=>"$reportedBy")
                 );
    }

    public function updateStatus()
    {
        $reportID = Input::get('reportID');
        $comment = Input::get('comment');
        //$status = Input::get('status');

        Report::where('reportID', $reportID)
            ->update(array(
                    'comment'=>"$comment")
            );
    }
} //,'status'=>"$status"
