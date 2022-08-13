<?php
	header("Content-Type:application/json");
	$config = require("config.php");
  $statement = "release";
  
	if ($statement == "release") {
    $connect = mysqli_connect($config[1], $config[2], $config[3], $config[4]);
  }
  else {
    $connect = mysqli_connect("127.0.0.1:3307", $config[2], $config[3], $config[4]);
  }
  if ($connect) {
    $sql = "insert into " . $config[5] . "users (username, password, identifier) values (\"#{username}\", md5(\"#{password}\"), \"\");";
    $sql = str_replace("#{username}", $_POST['username'], $sql);
    $sql = str_replace("#{password}", $_POST['password'], $sql);
    $result = $connect->query($sql);
    
    $sql = "update " . $config[5] . "users set identifier=md5(concat(\"#{password}\", \"#{username}\", LAST_INSERT_ID())) where id=LAST_INSERT_ID();";
    $sql = str_replace("#{username}", $_POST['username'], $sql);
    $sql = str_replace("#{password}", $_POST['password'], $sql);
    $result = $connect->query($sql);
    echo json_encode($result);
  }
?>