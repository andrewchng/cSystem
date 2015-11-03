@extends('layouts.master')

@section('content')
	<div class="main-content">
        <div class="page-header navbar navbar-fixed-top">
            @include('layouts.dashboard_header')
        </div>

        <!-- BEGIN SIDEBAR -->
        <div class="page-sidebar-wrapper col-md-3"
             ng-include src=" '/assets/partials/feed_bar.html' "></div>
        <!-- END SIDEBAR -->


        <div class="page-content col-md-9">
            <div id="map-container" class="page-content-inner" style="min-height: 748px">
                <div ng-view class="slide"></div>
            </div>
        </div>
        <script src="//code.jquery.com/jquery-1.11.3.min.js"></script>
        <script src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
        <script type='text/javaScript' src='http://www.onemap.sg/API/JS/?accessKEY=xkg8VRu6Ol+gMH+SUamkRIEB7fKzhwMvfMo/2U8UJcFhdvR4yN1GutmUIA3A6r3LDhot215OVVkZvNRzjl28TNUZgYFSswOi&v=3.10&type=full'></script>
        {{ HTML::script('assets/scripts/map/map-main.js') }}
        <script type="text/javascript">
            $(function (argument) {
                $.getScript('assets/scripts/map/dengue.js');
                $.getScript('assets/scripts/map/traffic.js');
            });
        </script>
        <!-- BEGIN FOOTER -->
        <div class="page-footer">
            @include('layouts.dashboard_footer')
        </div>
    </div>
@stop