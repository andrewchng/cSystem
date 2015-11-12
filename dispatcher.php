<?php
$_SERVER_ADDRESS = 'http://api.ssad.localhost/email/report';
if (isset($argv[1]) && is_numeric($argv[1])) {
	$_SERVER_ADDRESS .= '/' . $argv[1];
}

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $_SERVER_ADDRESS);
curl_setopt($ch, CURLOPT_FRESH_CONNECT, true);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_VERBOSE, true);
$response = curl_exec($ch);
curl_close($ch);
?>