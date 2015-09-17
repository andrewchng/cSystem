@extends('layouts.master')

@section('content')
    @include('layouts.dashboard_header')

    <p>SUCCESSFUL LOGIN!</p>
    @yield('content')
    @include('layouts.dashboard_footer')
@stop