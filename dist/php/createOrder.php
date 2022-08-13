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
    $sql = "INSERT INTO " . $config[5] . "flange (material,holes,holesPadding,flangeRadius,flangeThickness,holesRadius,centerRadius,neckBottom,neckTop,neckHeight,segments,buyer,buyer_identifier,amount,contact) VALUES (\"#{material}\",#{holes},#{holesPadding},#{flangeRadius},#{flangeThickness},#{holesRadius},#{centerRadius},#{neckBottom},#{neckTop},#{neckHeight},#{segments},\"#{buyer}\",\"#{buyer_identifier}\",#{amount},#{contact});";
    $sql = str_replace("#{material}", $_POST['material'], $sql);
    $sql = str_replace("#{holes}", $_POST['holes'], $sql);
    $sql = str_replace("#{holesPadding}", $_POST['holesPadding'], $sql);
    $sql = str_replace("#{flangeRadius}", $_POST['flangeRadius'], $sql);
    $sql = str_replace("#{flangeThickness}", $_POST['flangeThickness'], $sql);
    $sql = str_replace("#{holesRadius}", $_POST['holesRadius'], $sql);
    $sql = str_replace("#{centerRadius}", $_POST['centerRadius'], $sql);
    $sql = str_replace("#{neckBottom}", $_POST['neckBottom'], $sql);
    $sql = str_replace("#{neckTop}", $_POST['neckTop'], $sql);
    $sql = str_replace("#{neckHeight}", $_POST['neckHeight'], $sql);
    $sql = str_replace("#{segments}", $_POST['segments'], $sql);
    $sql = str_replace("#{buyer}", $_POST['buyer'], $sql);
    $sql = str_replace("#{buyer_identifier}", $_POST['buyer_identifier'], $sql);
    $sql = str_replace("#{detail}", $_POST['detail'], $sql);
    $sql = str_replace("#{amount}", $_POST['amount'], $sql);
    $sql = str_replace("#{contact}", $_POST['contact'], $sql);
    $result = $connect->query($sql);
    echo mysqli_error($connect);
    echo json_encode($result);
  }
?>