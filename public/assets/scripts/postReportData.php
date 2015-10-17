<?php
/**
 * Created by PhpStorm.
 * User: andrewchng
 * Date: 14/10/15
 * Time: 10:15 PM
 */

$data = json_decode(file_get_contents("php://input"));
$location = mysql_real_escape_string($data->location);
$type = mysql_real_escape_string($data->type);
$datetime = mysql_real_escape_string($data->datatime);
$report = mysql_real_escape_string($data->report);
$contact = mysql_real_escape_string($data->contact);

mysql_connect("localhost","root","root") or die(mysql_error());
mysql_select_db("ssad") or die(mysql_error());
mysql_query("INSERT INTO Reports(reportType,reportedBy,contactNo,location,reportDateTime)VALUES('$type','$report','$contact','$location','$datetime')") or die(mysql_error());


?>