@extends('layouts.master')

@section('content')
    <div class="main-content" data-ng-controller="DashboardCtrl">
        <div class="page-header navbar navbar-fixed-top">
            @include('layouts.dashboard_header')
        </div>

        {{--<div class="container-fluid" data-ng-controller="AppCtrl">--}}
            {{--<div class="main" ng-view>--}}

            {{--</div>--}}
        {{--</div>--}}

        <!-- BEGIN SIDEBAR -->
        <div class="page-sidebar-wrapper col-md-2"
             ng-include src=" '/assets/partials/sidebar.html'"></div>
        <!-- END SIDEBAR -->


        <div class="page-content col-md-10">
            <div class="page-content-inner" style="min-height: 748px">
                <div ng-view class="slide"></div>
            </div>
        </div>

        <!-- BEGIN FOOTER -->
        <div class="page-footer">
            @include('layouts.dashboard_footer')
        </div>
    </div>
    <!-- END FOOTER -->
@stop