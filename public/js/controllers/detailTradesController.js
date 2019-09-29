uosApp.controller( "detailTradesController", 
	['$scope','$location','UrlService','$http','$timeout',
	'$rootScope','$routeParams','$mdDialog','ToolbarService','Notification',function($scope,$location,UrlService,$http,
	$timeout,$rootScope,$routeParams, $mdDialog,ToolbarService,Notification) {
	$scope.trade = {}; 
	$scope.trader={
			userWins:[],
			userLosses:[],
			cash:0,
			avgLosse:0,
			avgGain:0,
			percentWin:0
				};

	$scope.tradeDetail = function(){
			if(ToolbarService.getUser()!==null){
				$http.get('/user/watch-specific-trade/?id='+$routeParams.tradeId+'&userId='+ToolbarService.getUser().user._id).success( function(data){
		            $scope.onlineUser = data.user;
		            angular.forEach($scope.onlineUser.userTrades, function (v,key) {
		            	// body...
		            	if(v.profit>0){
		            		$scope.trader.userWins.push(v.profit);
		            	}else{
	            			$scope.trader.userLosses.push(v.profit);
		            	}

						if(v.profit!==undefined){
		            		$scope.trader.cash+=v.profit;
		            	}
		            }) 
		            var tempWins= 0;
		            angular.forEach($scope.trader.userWins, function (v) {
		            	// body...
		            	tempWins+=v;
		            })
		            $scope.trader.avgGain = parseFloat(tempWins/$scope.trader.userWins.length).toFixed(2)
	             	var tempLosses= 0;
		            angular.forEach($scope.trader.userLosses, function (v) {
		            	// body...
		            	tempLosses+=v;
		            })
		            $scope.trader.avgLosse=parseFloat(tempLosses/$scope.trader.userLosses.length).toFixed(2)
		            $scope.trader.percentWin = parseFloat(($scope.trader.userWins.length/$scope.onlineUser.userTrades.length)).toFixed(2); 
		            $scope.trade = data.trade;   
		            $scope.hasePicture =($scope.trade.pictureUrl !=='' && $scope.trade.pictureUrl !==undefined); 
		        }).error( function(err){
		        	Notification.error('You have to be connected to see trades');
		        	ToolbarService.setUser(null)
		        	$location.url('/')
		        })
			}else{ 
				$location.url('/')
			}
		}; 

		$scope.editPosition = function (tradeToEdit) { 
			console.log(tradeToEdit._id)
			$location.url('/edite-trade/'+tradeToEdit._id);  
		}
		$scope.showBigImage = function (argument) {
			// body...
			$mdDialog.show({
				controller: EmbeddeDetailTradesController,
				templateUrl:'partials/big-detail-trade.html',
				parent: angular.element(document.body),
	            locals: {
	                trade : $scope.trade 
	            },
	            clickOutsideToClose: true
				})
		}


		function EmbeddeDetailTradesController($scope, $mdDialog, $http, trade) {
        $scope.trade= trade;
        $scope.hasePicture =($scope.trade.pictureUrl !=='' && $scope.trade.pictureUrl !==undefined);
	       
        $scope.cancel = function () {
            $mdDialog.hide();
        }


    }

	$scope.tradeDetail();
}]);

 