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
//        ReportStatusType::create(array(
//            'reportStatusTypeName'=>'Pending'));
//        ReportType::create(array(
//            'reportTypeName'=>"Traffic"));
    }

    public function listing()
    {
        $report = Report::all();
        return $report->toJson();
    }
}