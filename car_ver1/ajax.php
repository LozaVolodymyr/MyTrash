<?php

$action = $_REQUEST['action'];

$pdo = new PDO('mysql:host=localhost;dbname=c11loza1;charset=utf8', 'c11_loza', '0631883780');
if ($action == "users") {
$statement=$pdo-> prepare("SELECT id, email, firstname, lastname, message FROM `users`");

$statement-> execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;
} 


elseif ($action == "cars") {
$statement=$pdo-> prepare("SELECT model, eng_type, gear_type, dayprice, capacity FROM `cars`");

$statement-> execute();
$results=$statement->fetchAll(PDO::FETCH_ASSOC);
$json = json_encode($results);
echo $json;
}

elseif ($action == "addusers") {
	
	$firstname = $_POST['firstname'];
	$lastname = $_POST['lastname'];
	$email = $_POST['email'];
	$message = $_POST['message'];
 	$statement=$pdo-> prepare("INSERT INTO users (firstname, lastname, email, message) VALUES('".$firstname."', '".$lastname."', '".$email."','".$message."')");
	$statement-> execute();	
	
	Header("Location: index.html");
}

elseif ($action == "addcars") {
	$model = $_POST['model'];
	$eng_type = $_POST['eng_type'];
	$gear_type = $_POST['gear_type'];
	$dayprice = $_POST['dayprice'];
	$capacity = $_POST['capacity'];
	$statement=$pdo-> prepare("INSERT INTO cars (model, eng_type, gear_type, dayprice, capacity) VALUES('".$model."', '".$eng_type."', '".$gear_type."','".$dayprice."','".$capacity."')");
	$statement-> execute();		


	Header("Location: index.html");
}

elseif ($action == "userdel") {
	$id = intval($_GET['id']);
	$statement=$pdo-> prepare("DELETE FROM users WHERE id = '".$id."'");
	$statement-> execute();

}
elseif ($action == "client_search") {
	if ($_POST['select_client'] == "email") {
		$where = " WHERE email like '%".$_POST['search']."%'";
	} else {
		$where = " WHERE firstname like '%".$_POST['search']."%' OR lastname like '%".$_POST['search']."%'";
	}
	$statement=$pdo->prepare("SELECT * FROM users".$where);
	$statement-> execute();
	$results=$statement->fetchAll(PDO::FETCH_ASSOC);
	$json = json_encode($results);
	echo $json;
}
// ("UPDATE users SET firstname='".$id."', lastname='".$id."' WHERE id = '".$id."'");
?>

