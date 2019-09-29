uosApp.controller( "IndexController", ["$mdDialog","$scope","$http","$location","$timeout","UrlService",
	"Notification","ToolbarService"
	,function($mdDialog,$scope,$http,$location,$timeout,UrlService,Notification,ToolbarService) {
	var home = this;
	$scope.logedUser= {
		state:false 
	} 
	 $scope.communityTrades =  function() {
			$location.url('/communityTrades')
	};

	$scope.showLogOption= function (argument) {
		// body... 
		$scope.logOption = !argument;
	}

	$scope.showUserProfile= function (argument) {
		// body... 
		var userId = ToolbarService.getUser()!==null?ToolbarService.getUser().user._id:"";
		$http.get('/norr-user/show-personal/'+userId).then( function (data, status,config) {
			// body...
			$scope.profileUser = data;
			$location.url('/user-profile/'+userId);
		});
		$scope.logOption = false;

	}

	$scope.urls = { }

	$scope.getHomeVideo = function(){
		$timeout( function(){
 			/*UrlService.norrLabHomeVideo.then( function(res){
					$scope.urls.norrLabHomeVideo =  res.data;
					},function(){
				
			}) */

		},1);
	}

	$scope.goToHome = function() {
			$location.url('/home')
	}
	
	$scope.marketNews = function() {
		$location.url('/news')
	}
	
	$scope.analyse = function() {
		$location.url('/analyse')
	}
	$scope.economicCalendar = function (argument) {
		// body...
		$location.url('/economic-calendar')
	}
	$scope.analyseDetail = function() { 
		$location.url('/analyse/:id')
	} 
	
	$scope.formations = function() { 
		$http.get('/somez').then(function(){
			alert('done')
		},function(){

		}) 
	}
	$scope.$on('userConnected-pass', function(){
		$scope.loadPage(); 
	})
	$scope.signIn = function () {
		// body...
		$mdDialog.show({
				controller: EmbeddeDetailTradesController,
				templateUrl:'partials/user-mgnt/user-logup.html',
				parent: angular.element(document.body),
		        clickOutsideToClose: false
		}).then( function (response) {
			// body...
			if(response!==undefined){ 
				$scope.onlineUser = response.user;
				$scope.userToken = response.token;
				$scope.logedUser.state=true; 
				ToolbarService.login(response);
				$scope.$broadcast('userConnected');
        		//window.location.reload();
			}
		})
	}

	$scope.signOut = function () {
		// body...
		ToolbarService.clearAll(); 
        window.location.reload();
	}
	
	function EmbeddeDetailTradesController($scope, $http) {
		// body...
		$scope.user = {
			email:"",
		 	password:""
		 }
		 $scope.norrLogin = function () {
		 	// body... 
		 	$http.post('/norr-user/login', $scope.user).success( function (data) {
		 		// body...
		 		Notification.success(" Welcome "+data.user.lastName);

		 		$mdDialog.hide(data);

		 	}).error( function (err) {
		 		// body...
		 		Notification.error("You must provide correct email and password")
		 	})

		 }

		 $scope.cancel = function () {
		 	// body...
		 	$mdDialog.hide();
		 }
	}
	$scope.loadPage = function () {
		// body... 
		 if(ToolbarService.getUser()!== null){
		 	$scope.onlineUser = ToolbarService.getUser().user;
		 	$scope.userToken = ToolbarService.getUser().token;
		 	$scope.logedUser.state=true;
		 }else{
		 	$scope.onlineUser = "";
		 	$scope.userToken ="";
		 	$scope.logedUser.state=false;
		 }    
	}

	$scope.loadPage(); 
 
}]);