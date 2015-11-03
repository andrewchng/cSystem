<!-- Stored in app/views/master.blade.php -->
<!DOCTYPE html>
<html lang="en" data-ng-app="cSystem">

<head>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <base href="/">
    <title>cSystem</title>


    <!--Boostrap-->
    <link id="bootstrap-style" href="/assets/styles/bootstrap.min.css" rel="stylesheet">
    <link href="/assets/styles/bootstrap-theme.min.css" rel="stylesheet">
    {{--Font-Awesome--}}
    <link href="/assets/styles/font-awesome.min.css" rel="stylesheet">
    {{--toastr--}}
    <link href="/assets/styles/toastr.min.css" rel="stylesheet">
    {{--slick--}}
    <link href="/assets/styles/slick.min.css" rel="stylesheet">
    {{--Main CSS--}}
    <link href="/assets/styles/main.min.css" rel="stylesheet">




</head>
<body ng-cloak>

<div class="main-container" data-ng-controller="AppCtrl">
@yield('content')
</div>

<script type="text/javascript" src="/assets/scripts/fusioncharts.js"></script>
<script type="text/javascript" src="/assets/scripts/fusioncharts.charts.js"></script>
<script type="text/javascript" src="/assets/scripts/main-plugins.js"></script>
<script type="text/javascript" src="/assets/scripts/themes/fusioncharts.theme.fint.js"></script>
<script type="text/javascript" src="/assets/scripts/themes/fusioncharts.theme.ocean.js"></script>
<script type="text/javascript" src="/assets/scripts/themes/fusioncharts.theme.zune.js"></script>
<script type="text/javascript" src="/assets/scripts/themes/fusioncharts.theme.carbon.js"></script>
<script type="text/javascript" src="/assets/scripts/angular-fusioncharts.min.js"></script>
<script type="text/javascript" src="/assets/scripts/app.js"></script>
<script  type="text/javascript" src="/assets/scripts/directives/custom.directive.js"></script>
</body>
</html>