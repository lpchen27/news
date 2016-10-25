app.controller('newsCtrl',function($scope,$routeParams,$http,$cookieStore,string){
	$scope.name = "lpchen";
	$scope.datas = [];
	$scope.type = 'top';
	$scope.news_num = 8;
	if(!$cookieStore.get('myCity')){
		$scope.myCity = '北京';
	}
	if($cookieStore.get('nav_list') && $cookieStore.get('nav_nolist')){
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
		{class : 'junshi',content : '军事'},
		{class : 'keji',content : '科技'},
		{class : 'caijing',content : '财经'},
		{class : 'shishang',content : '时尚'},
		];	
		$cookieStore.put('nav_list',$scope.navs);
			//console.log($cookieStore.get('nav_list'));
			$cookieStore.put('nav_nolist',$scope.no_navs);
			//console.log($cookieStore.get('nav_nolist'));
		}
		
		$scope.ajax = function(type){  //定义一个获取新闻数据的jsonp请求函数
			//alert($scope.news_num);
			$scope.type = type;
			$('iheader h3 .iconfont').addClass('animate_refresh');
			$http.jsonp('php/news.php',{
				params : {
					type : type,
					callback : 'JSON_CALLBACK',
				},
			}).success(function(data){
				var pre_datas = $scope.datas;
				//console.log(pre_datas.length);
				$scope.datas = data.result.data;
				$('iheader h3 .iconfont').removeClass('animate_refresh');
				//console.log($scope.datas.length);
				//$scope.$apply($scope.datas);
				//console.log($scope.datas);
			});
		}
		$scope.ajax($scope.type);

		var myCity = new BMap.LocalCity();
		myCity.get(function(result){
			//console.log(result);
			//console.log(string.getCityName(result.name));
			$scope.myCity = string.getCityName(result.name);
			//$scope.$apply($scope.myCity);
			$cookieStore.put('myCity',string.getCityName(result.name));
			console.log($cookieStore.get('myCity'));
		});
		
	})

app.directive('inav',function(){
		return {
			templateUrl : 'directive/inav.html',
			link : function(scope,ele,attr){
				var el = $(ele[0]);
				el.find('.add').on('click',function(){
					window.location.href = '#/selectnav';
				})
			}
		};
	});

	app.directive('navList',function(){
		return {
			link : function(scope,ele,attr){
				//console.log(ele[0].parentNode);	
				var el = $('inav');
				if(scope.$last){   //在ng-repeat渲染完成后执行后面的函数
					//var el = ele;
					var x1,x2;
					var ul = el.find('ul');
					var li = el.find('li');
					//console.log(li);
					var len = li.length;
					var w = li[0].clientWidth;
					var clientWidth = parseInt(document.body.clientWidth);
					//console.log('clientWidth:'+ clientWidth);
					ul.css('width',len*w+'px');  //定义ul的宽度
					ul.css('left','0');
					//alert(888);
					console.log(el);
					//console.log(ul.css('left'));
					el.on('touchstart',function(e){
						x1 = parseInt(e.changedTouches[0].clientX);
						//console.log(x1);
						el.on('touchmove',function(e){
							var x2 = parseInt(e.changedTouches[0].clientX);
							var offsetX = x2 - x1;
							var left = parseInt(ul.css('left')) + offsetX;
							//console.log(left);
							if(left >= 0 ){
								left = 0;
							}else if(left <= -len*w + clientWidth - 30 ){
								left = -len*w + clientWidth - 30;
							}
							ul.css('left',left+'px');
							x1 = x2;
						})
					})
				}
			}
		};
	});
	

	app.directive('inews',function(){
		return {
			templateUrl : 'directive/inews.html',
			link : function(scope,ele,attr){
				var el = ele;
				//console.log(scope);
				ele.on('touchstart',function(e){
					var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
					//console.log('scrollTop:'+scrollTop);
					//console.log(e);
					if(scrollTop == 0){  //当页面在顶部时
						var y1 = e.changedTouches[0].clientY;
						//console.log('y1:'+y1);
						el.on('touchend',function(e){
							var y2 = e.changedTouches[0].clientY;
							//console.log('y2:'+y2);
							//console.log(y2 - y1);
							if(y2 - y1 >= 100){  //且下拉距离大于150时，重新刷新页面
								//alert('scrollTop:'+scrollTop);
								//console.log('refresh');
								/*$('iheader h3 .iconfont').addClass('animate_refresh');
								setTimeout(function(){
									$('iheader h3 .iconfont').removeClass('animate_refresh');
								},2000);*/
								//alert('刷新');
								scope.news_num += 8;   //下拉时。多增加8条新闻
								scope.ajax(scope.type);								
								scope.$apply(scope.datas);  //手动刷新
								el.off('touchend');
								return;
							}else{
								el.off('touchend');  //一定要加上不然会出错
								return;
							}
						});
					}
				})
			}
		};
	});

	app.directive('iheader',function(){
		return {
			templateUrl : 'directive/iheader.html',
			link : function(scope,ele,attr){
				var el = $(ele[0]);
				el.find('.weather').on('click',function(){
					window.location.href = '#/weather';
				});
			}
		};
	})
