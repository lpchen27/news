
	app.controller('weatherCtrl',function($scope,$routeParams,$http){
		//$scope.flag = 0;
		$scope.arr = [];
		$scope.iconlist = [
			{'0':'icon-qing'},
			{'1':'icon-duoyun'},
			{'2':'icon-yin-copy'},
			{'3':'icon-zhenyu2'},
			{'4':'icon-leizhenyu'},
			{'5':'icon-thunderStormHail'},
			{'6':'icon-yujiaxue'},
			{'7':'icon-xiaoyu'},
			{'8':'icon-zhongyu'},
			{'9':'icon-dayu'},
			{'10':'icon-baoyu'},
			{'11':'icon-dabaoyu'},
			{'12':'icon-tedabaoyu'},
			{'13':'icon-zhenxue'},
			{'14':'icon-xiaoxue'},
			{'15':'icon-snow_level_03'},
			{'16':'icon-daxue'},
			{'17':'icon-snow_level_07'},
			{'18':'icon-wu'},
			{'19':'icon-dongyu'},
			{'20':'icon-shachenbao'},
			{'21':'icon-xiaodaozhongyu'},
			{'22':'icon-zhongdaodayu'},
			{'23':'icon-dadaobaoyu'},
			{'24':'icon-rain_level_08'},
			{'25':'icon-rain_level_10'},
			{'26':'icon-xiaodaozhongxue'},
			{'27':'icon-snow_level_04'},
			{'28':'icon-snow_level_06'},
			{'29':'icon-fuchen'},
			{'30':'icon-blowingSand'},
			{'31':'icon-severeSandStorm'},
			{'53':'icon-mai'},
		];
		$scope.iconlist2 = [
			'icon-qing',
			'icon-duoyun',
			'icon-yin-copy'	,
			'icon-zhenyu2'	,
			'icon-leizhenyu',
			'icon-thunderStormHail',
			'icon-yujiaxue',
			'icon-xiaoyu',
			'icon-zhongyu',
			'icon-dayu',
			'icon-baoyu',
			'icon-dabaoyu',
			'icon-tedabaoyu',
			'icon-zhenxue',
			'icon-xiaoxue',
			'icon-snow_level_03',
			'icon-daxue',
			'icon-snow_level_07',
			'icon-wu',
			'icon-dongyu',
			'icon-shachenbao',
			'icon-xiaodaozhongyu',
			'icon-zhongdaodayu',
			'icon-dadaobaoyu',
			'icon-rain_level_08',
			'icon-rain_level_10',
			'icon-xiaodaozhongxue',
			'icon-snow_level_04',
			'icon-snow_level_06',
			'icon-fuchen',
			'icon-blowingSand',
			'icon-severeSandStorm',
		];
		$scope.iconlist2[53] = 'icon-mai';
		$scope.otherCity = '';

		$scope.ajax = function(city){
			//alert(city);
			$http.jsonp('php/weather.php',{
				params : {
					city : city,
					callback : 'JSON_CALLBACK',
				},
			}).success(function(data){
				//alert(8888);
				console.log(data);
				$scope.data = data.result.data;
				console.log($scope.data);
				var num = $scope.data.realtime.weather.img;

				angular.forEach($scope.iconlist,function(value){
					if(value[num]){
						$scope.flag = value[num];
						//alert(scope.flag);
						return;
						
					}
				});
				var arr = [];
				arr.push(parseInt($scope.data.weather[1].info.day[0]));
				arr.push(parseInt($scope.data.weather[2].info.day[0]));
				arr.push(parseInt($scope.data.weather[3].info.day[0]));
				angular.forEach(arr,function(value,index){
					$scope.arr.push($scope.iconlist2[value]);
				});
			});
		}

		$scope.returnback = function(){
			window.location.href = '#/news/1';
		}	
	});

	