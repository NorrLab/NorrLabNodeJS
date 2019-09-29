uosApp.controller( "UserProfileConroller", ['ToolbarService','$rootScope','$scope','$location','UrlService','$http','$timeout','$rootScope','Upload','$routeParams',
	'Notification',
	function(ToolbarService,$rootScope,$scope,$location,UrlService,$http, $timeout,$rootScope,Upload,$routeParams,Notification) {

	var showUserProfile= function (argument) {
		// body... 
		var userId = ToolbarService.getUser()!==null?ToolbarService.getUser().user._id:"";
		$http.get('/norr-user/show-personal/'+userId).then( function (data, status,config) {
			// body...
			$scope.profileUser = data;
			$location.url('/user-profile/'+userId);
		});
		$scope.logOption = false;

	}

	showUserProfile();
}]);