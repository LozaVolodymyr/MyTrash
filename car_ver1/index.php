<?php
$action = $_REQUEST['action'];

$pdo = new PDO('mysql:host=localhost;dbname=c11loza1;charset=utf8', 'c11_loza', '0631883780');


if($action == "post") {
	$field1 = $_POST['firstname'];
	$field2 = $_POST['lastname'];
	$field3 = $_POST['email'];
 	$statement=$pdo-> prepare("INSERT INTO users (firstname, lastname, email) VALUES('$field1', '$field2', '$field3')";
	mysql_query($query) or die('Error, insert query failed');	
	mysql_close();
    }

?>