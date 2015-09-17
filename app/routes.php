<?php


/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/

if (!isset($_SERVER['HTTP_HOST'])) {
    // For running commands
    require_once('routes-api.php');
} else {
    if (strpos($_SERVER['HTTP_HOST'], 'api') !== false) {
        // For api endpoints
        require_once('routes-api.php');
    } else {
        // For frontend endpoints
        require_once('routes-frontend.php');
    }
}





