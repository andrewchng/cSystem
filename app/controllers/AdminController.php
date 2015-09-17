<?php
/**
 * Created by PhpStorm.
 * User: Ernie
 * Date: 16/9/15
 * Time: 10:11 PM
 */

class AdminController extends BaseController {


    public function getDashboard()
    {
        return View::make('layouts.dashboard');
    }

}