<?php

class SubscriberController extends BaseController
{
    public function index()
    {
        $subscribers = Subscriber::all();

        return Response::json($subscribers)->setCallback(Input::get('callback'));
    }
}