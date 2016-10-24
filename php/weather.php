<?php
	header('content-type:text/html;charset=utf-8');

	$url = 'http://op.juhe.cn/onebox/weather/query?cityname='.$_GET['city'].'&key=34181193b5483bdef7f6ad924a0deb97';
	$data = file_get_contents($url);
	echo $_GET['callback'].'('.json_encode($data).')';
?>