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
    $sql = "select * from " . $config[5] . "flange";
    $result = $connect->query($sql)->fetch_all(MYSQLI_ASSOC);
    echo json_encode($result);
  }
?>