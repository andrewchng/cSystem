@extends('layouts.master')

@section('content')
    <div class="page-header navbar navbar-fixed-top">
        @include('layouts.dashboard_header')
    </div>

    <div class="container-fluid" data-ng-controller="AppCtrl">
        <div class="main" ng-view>

        </div>
    </div>

    <!-- BEGIN FOOTER -->
    <div class="page-footer">
        @include('layouts.dashboard_footer')
    </div>
    <!-- END FOOTER -->
@stop