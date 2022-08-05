<?php
/*
 * @Author: PlanC14 planc2333@outlook.com
 * @Date: 2022-08-05 21:40:25
 * @LastEditors: PlanC14 planc2333@outlook.com
 * @LastEditTime: 2022-08-05 21:52:22
 * @FilePath: \flange-preview\public\php\flange.php
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
  $config = require('config.php');
  print($config);
  $connect = mysql_connect($MySQL_Host, $MySQL_User, $MySQL_Pass, $MySQL_DB_Prefix);
?>