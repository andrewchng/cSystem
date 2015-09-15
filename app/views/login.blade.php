@extends('layouts.master')

@section('content')
    <div class="spacer visible-xs"></div>
    <div class="container-fluid-full">
            <div class="row-fluid visible-lg visible-md visible-sm">
                <div class="login-box">

                    <h2>Admin Login</h2>
                    <form id="loginForm" class="form-horizontal" action="login" method="post">


                        <div class="form-group">

                            <div class="col-md-12">
                                {{--<input type="text" class="form-control" name="username" placeholder="type username" />--}}
                                <p>
                                    {{ Form::text('username', Input::old('username'), array('placeholder' => 'username', 'class' => 'form-control')) }}
                                </p>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-12">
                                {{--<input type="password" class="form-control" name="password" placeholder="type password" />--}}

                                <p>
                                    {{ Form::password('password', array('placeholder' => 'password', 'class' => 'form-control')) }}
                                </p>
                            </div>
                        </div>

                        <div class="errormessage">
                            <p>
                                {{ $errors->first('username') }}
                                {{ $errors->first('password') }}
                            </p>
                        </div>



                        <div class="button-login">
                            {{--<button type="submit" class="btn btn-primary">Login</button>--}}
                            {{ Form::submit('Submit!', array('class' => 'btn btn-primary')) }}
                        </div>
                        <div class="clearfix"></div>
                    </form>
                    <hr>

                </div><!--/span-->
            </div><!--/row-->

        <div class="row visible-xs mobile-login">
            <h2>Admin Login</h2>

            <form action="login" method="post">
                <div class="form-group">

                    <div class="col-md-12">
                        <input type="text" class="form-control" name="username" placeholder="type username"/>
                    </div>

                    <div class="col-md-12">
                        <input type="password" class="form-control" name="password" placeholder="type password"/>
                    </div>

                    <div class="button-login">
                        <button type="submit" class="btn btn-primary">Login</button>
                    </div>
                </div>
            </form>
        </div>



    </div><!--/.fluid-container-->
@stop

