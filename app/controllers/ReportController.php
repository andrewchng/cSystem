<?php

class ReportController extends BaseController
{
    public function listing()
    {
        $report = Report::all();
        return $report->toJson();
    }
}