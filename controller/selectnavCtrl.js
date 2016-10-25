app.controller('selectnavCtrl',function($scope,$routeParams,$cookieStore){
		if($cookieStore.get('nav_list') && $cookieStore.get('nav_nolist')){  //初始化
			$scope.navs = $cookieStore.get('nav_list');
			$scope.no_navs = $cookieStore.get('nav_nolist');
		}else{
			$scope.navs = [
				{class : 'shehui',content : '社会'},
				{class : 'guonei',content : '国内'},
				{class : 'guoji',content : '国际'},
				{class : 'yule',content : '娱乐'},
				{class : 'tiyu',content : '体育'},
			];
			$scope.no_navs = [
				{class : 'top',content : '军事'},
				{class : 'shehui',content : '科技'},
				{class : 'guonei',content : '财经'},
				{class : 'guoji',content : '时尚'},
			];	
			$cookieStore.put('nav_list',$scope.navs);
			//console.log($cookieStore.get('nav_list'));
			$cookieStore.put('nav_nolist',$scope.no_navs);
			//console.log($cookieStore.get('nav_nolist'));
		}

		$scope.delete = function(cls){  //删除菜单
			var del_index ;
			var obj = {};
			angular.forEach($scope.navs,function(value,index){
				if(value.class == cls){
					del_index = index;
					obj = $scope.navs[index];
					return ;
				}
			});
			$scope.navs.splice(del_index,1);
			$scope.no_navs.push(obj);
		}

		$scope.add = function(cls){   //添加菜单
			var add_index ;
			var obj = {};
			angular.forEach($scope.no_navs,function(value,index){
				if(value.class == cls){
					add_index = index;
					obj = $scope.no_navs[index];
					return ;
				}
			});
			$scope.no_navs.splice(add_index,1);
			$scope.navs.push(obj);
		}
	});

	

app.directive('inavheader',function($cookieStore){
		return {
			templateUrl : 'directive/iheader2.html',
			link : function(scope,ele,attr){
				var el = $(ele[0]);
				el.find('.returnback').on('touchend',function(){
					$cookieStore.put('nav_list',scope.navs);					
					$cookieStore.put('nav_nolist',scope.no_navs);
					window.location.href = '#/news/1';
				})
			}
		};
	});

	app.directive('inavcontent',function(){
		return {
			templateUrl : 'directive/inavcontent.html',
			link : function(scope,ele,attr){

			}
		};
	});

	app.directive('iweather',function(string,$cookieStore,$http){
		return {
			templateUrl : 'directive/iweather.html',
			link : function(scope,ele,attr){
				if(!$cookieStore.get('myCity')){
					var myCity = new BMap.LocalCity();
					myCity.get(function(result){
						scope.myCity = string.getCityName(result.name);
						$cookieStore.put('myCity',string.getCityName(result.name));
					});
					if(scope.myCity){
						scope.city = scope.myCity + '市';
					}
				}else{
					scope.myCity = $cookieStore.get('myCity');
					scope.city = scope.myCity + '市';
					ajax(scope.myCity);
				}

				
				function ajax(city){
					$http.jsonp('php/weather.php',{
						params : {
							city : city,
							callback : 'JSON_CALLBACK',
						},
					}).success(function(data){
						//alert(8888);
						console.log(data);
						scope.data = data.result.data;
						console.log(scope.data);
						var num = scope.data.realtime.weather.img;

						angular.forEach(scope.iconlist,function(value){
							if(value[num]){
								scope.flag = value[num];
								//alert(scope.flag);
								return;
								
							}
						});
						var arr = [];
						arr.push(parseInt(scope.data.weather[1].info.day[0]));
						arr.push(parseInt(scope.data.weather[2].info.day[0]));
						arr.push(parseInt(scope.data.weather[3].info.day[0]));
						angular.forEach(arr,function(value,index){
							scope.arr.push(scope.iconlist2[value]);
						});
					});
				}	
			}
		};
	});
