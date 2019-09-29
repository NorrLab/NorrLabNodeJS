uosApp.controller( "communityTradesController", ['Notification','ToolbarService','$scope','$location','UrlService','$http','$timeout',
    function(Notification,ToolbarService,$scope,$location,UrlService,$http, $timeout) {
    

	$scope.tradeDetail = function(tradeId){
        var userId = "";
         if(ToolbarService.getUser()!== null){
            userId = ToolbarService.getUser().user._id
         } 
		$http.get('/user/watch-specific-trade-access/?userId='+userId).success( function(data){
            $scope.trade = data;  
            $location.url('/tradeDetail/'+tradeId); 
        }).error( function(err){
            ToolbarService.setUser(null);
            $scope.$emit('userConnected-pass');
            Notification.error('You have to be connected to see trades.');
        })
	}
 
	$scope.editeNewTrade = function(){
        $location.url('/create-trade/');
    }

    var loadPage = function(){
        var userId = "";
         if(ToolbarService.getUser()!== null){
            userId = ToolbarService.getUser().user._id
         } 
        $http.get('/user/all-trades/?userId='+userId).success( function(data){
            $scope.listOfTrades = data.data;
            if(ToolbarService.getUser()!==null){
                $scope.editeNorr = data.access;
            }
        }).error( function(err){
            Notification.error('no trade.')
        })
    }
    $scope.$on('userConnected', function () {
        // body...
        loadPage();
    });
    loadPage();
}]);