<?php
	header('content-type:text/html;charset=utf-8');
	$type = $_GET['type'];
	$url = 'http://v.juhe.cn/toutiao/index?type='.$type.'&key=c699e89f1577064ecd4ae106e79ba761'; 
	$data = file_get_contents($url);
	echo $_GET['callback']."(".json_encode($data).")";
?>