<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="utf-8">
</head>
<body>
<h2>{{$title}}</h2>

<div>
    <table>
        <tr>
            <td>Date</td>
            <td>:</td>
            <td>{{ $date }}</td>
        </tr>
        <tr>
            <td>Time</td>
            <td>:</td>
            <td>{{ $time }}</td>
        </tr>
    </table>

    <h3>Report Updates</h3>
    <table border=1>
        <tr>
            <td></td>
            @foreach ($updateCounts['new'] as $subType => $count) 
            <td>{{ ucfirst($subType) }}</td>
            @endforeach
        </tr>
        @foreach ($updateCounts as $type => $subType)
        <tr>
            <td>{{ ucfirst($type) }}</td>
            @foreach ($subType as $key => $value)
            <td>{{ $value }}</td>
            @endforeach
        </tr>
        @endforeach
    </table>

    <h3>Report Status</h3>
    <table border=1>
        <tr>
            <td></td>
            @foreach ($statusCounts as $type => $subType) 
                @foreach ($subType as $key => $value)
            <td>{{ ucfirst($key) }}</td>
                @endforeach
                <?php break;?>
            @endforeach
        </tr>
        @foreach ($statusCounts as $type => $subType)
        <tr>
            <td>{{ ucfirst($type) }}</td>
            @foreach ($subType as $key => $value)
            <td>{{ $value }}</td>
            @endforeach
        </tr>
        @endforeach
    </table>
    <h3>5 Latest Reports</h3>
    <table border=1>
        <tr>
            <td>ID</td>
            <td>Report Type</td>
            <td>Report Name</td>
            <td>Reported By</td>
            <td>Contact No</td>
            <td>Location</td>
            <td>Created At</td>
            <td>Updated At</td>
            <td>Comment</td>
            <td>Approved</td>
            <td>Assigned To</td>
            <td>Status</td>
        </tr>
        @foreach ($latestReports as $report)
        <tr>
            <td>{{ $report->reportID }}</td>
            <td>{{ $report->reportTypeName }}</td>
            <td>{{ $report->reportName }}</td>
            <td>{{ $report->reportedBy }}</td>
            <td>{{ $report->contactNo }}</td>
            <td>{{ $report->location }}</td>
            <td>{{ $report->created_at }}</td>
            <td>{{ $report->updated_at }}</td>
            <td>{{ $report->comment }}</td>
            <td>{{ $report->isApprovedS }}</td>
            <td>{{ $report->agencyName }}</td>
            <td>{{ $report->reportStatusTypeName }}</td>
        </tr>
        @endforeach
    </table>
    <div class="report_analytics">
        <div class="col-md-6 col-xs-12">
            <div fusioncharts
                 width="100%"
                 height="400"
                 type="msline"
                 >
            </div>
        </div>
        <div class="col-md-6 col-xs-12">
            <div fusioncharts
                 width="100%"
                 height="400"
                 type="mscolumn2d"
                 >
            </div>
        </div>
    </div>

</div>
</body>
</html>
