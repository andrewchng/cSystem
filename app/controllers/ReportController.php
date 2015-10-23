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
        $reportDateTime = Input::get('reportDataTime');
        $date = date('Y-m-d H:i:s');

        DB::table('Reports')->insert(
            ['reportName'=>"$reportName",'reportType'=>"$reportType",'location'=>"$location",'contactNo'=>"$contactNo",'reportedBy'=>"$reportedBy",'reportDateTime'=>"$reportDateTime",'created_at'=>'$date']);
    }
    public function listing()
    {
        $report = Report::all();
        return $report->toJson();
    }
}