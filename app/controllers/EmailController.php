<?php
class EmailController extends BaseController
{
    const _PM_EMAIL = 'pandaxxminister@gmail.com';

    private $_FREQUENCY = 1800;
    private $mailSender;

    public function __construct() {
        $this->mailSender = new EmailSender();
    }

    public function sendReport($frequency = 1800) {
        $this->_FREQUENCY = $frequency;
        $data = $this->getReportData();
        $data['interval'] = $frequency;
        $this->mailSender->sendEmail(self::_PM_EMAIL, 'emails.reports', $data);
        return $response = 'Mailing report of previous ' . $frequency . ' seconds.';;
    }

    public function showEmailSample() {
        return View::make('emails.reports', $this->getReportData());
    }

    public function getReportData() {
        $time = Carbon\Carbon::now();
        $prevTime = Carbon\Carbon::now()->subSeconds($this->_FREQUENCY);
        $data = [
            'subject'   => 'CMS Regular Report @ ' . $time->toDateTimeString(),
            'title'     => 'CMS Report from ' . $prevTime->diffForHumans(),
            'date'      => $time->toFormattedDateString(),
            'time'      => $time->toTimeString(),
        ];
        $reportController = new ReportController();
        $reports = json_decode($reportController->listing());
        usort($reports, 'self::compareDate');
        $statusCount = array();
        $updateCount = array('new' => array(), 'updated' => array());
        
        foreach ($reports as $report) {
            $reportCreated = new Carbon\Carbon($report->created_at);
            $reportUpdated = new Carbon\Carbon($report->updated_at);
            // if ($prevTime->diffInSeconds($reportUpdated, true) > $this->_FREQUENCY) {
            //     continue;
            // }
            if (!isset($updateCount['new'][$report->reportTypeName])) {
                $updateCount['new'][$report->reportTypeName] = 0;
            }
            if (!isset($updateCount['updated'][$report->reportTypeName])) {
                $updateCount['updated'][$report->reportTypeName] = 0;
            }

            if ($reportCreated->eq($reportUpdated)) {
                $updateCount['new'][$report->reportTypeName]++;
            } else {
                $updateCount['updated'][$report->reportTypeName]++;
            }
            if (!isset($statusCount[$report->reportStatusTypeName])) {
                $statusCount[$report->reportStatusTypeName] = array();
            }
            if (!isset($statusCount[$report->reportStatusTypeName][$report->reportTypeName])) {
                $statusCount[$report->reportStatusTypeName][$report->reportTypeName] = 0;
            }
            $statusCount[$report->reportStatusTypeName][$report->reportTypeName]++;
        }
        
        foreach ($statusCount as $key => $value) {
            $statusCount[$key]['total'] = array_sum($value);
        }
        $statusCount['total'] = array();
        foreach ($statusCount as $key => $value) {
            foreach ($value as $subKey => $subValue) {
                $statusCount['total'][$subKey] = 0;
                foreach ($statusCount as $sKey => $sValue) {
                    if ($sKey == 'total') {
                        continue;
                    }
                    $statusCount['total'][$subKey] += $statusCount[$sKey][$subKey];
                }
            }
            break;
        }
        
        $updateCount['total'] = array();
        foreach ($updateCount as $key => $value) {
            foreach ($value as $subKey => $subValue) {
                $updateCount['total'][$subKey] = 0;
                foreach ($updateCount as $sKey => $sValue) {
                    if ($sKey == 'total') {
                        continue;
                    }
                    $updateCount['total'][$subKey] += $updateCount[$sKey][$subKey];
                }
            }
            break;
        }
        foreach ($updateCount as $key => $value) {
            $updateCount[$key]['total'] = array_sum($value);
        }

        $data['statusCounts'] = $statusCount;
        $data['updateCounts'] = $updateCount;
        $data['latestReports'] = array_slice($reports, 0, 5, true);
        return $data;
    }

    public static function compareDate($report1, $report2) {
        $timeA = new Carbon\Carbon($report1->updated_at);
        $timeB = new Carbon\Carbon($report2->updated_at);
        return $timeA->lt($timeB);
    }
}