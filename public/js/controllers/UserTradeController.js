uosApp.controller( "UserTradeController", ['ToolbarService','$rootScope','$scope','$location','UrlService','$http','$timeout','$rootScope','Upload','$routeParams',
	'Notification',
	function(ToolbarService,$rootScope,$scope,$location,UrlService,$http, $timeout,$rootScope,Upload,$routeParams,Notification) {
	$scope.myDate = new Date(); 
	$scope.newtrade={
		description :"",
		entry: "",
		exit:"",
		entryDate: "",
		exitDate:"",
		product:"",
		creationDate : "",
		margin:"",
		type:"",
		pictureUrl :undefined,
		status:"",
		profit:"",
		broker:""
	};
	$scope.onDateChanged = function() {
    	  
    };
	var userId=ToolbarService.getUser()!==null?ToolbarService.getUser().user._id:"";

	var loadPage = function () {
		// body...
		if($routeParams.tradeId!== undefined && $routeParams.tradeId!== null)
		{	
			 
			$http.get('/user/get-specific-trade/'+$routeParams.tradeId+'?userId='+userId)
				.success( function (data) {
					// body...
					$scope.newtrade = data.data;
				}).error( function (data) {
					// body...
					$location.url('/')
				}) 	 
		}
	}
	$scope.pictureUploaded = false;
	$scope.tradeOptions=[
		'Buy',
		'Sell'
	];

	$scope.Brokers = ['FXCM','FxPro','eToro'];


	$scope.publishPublic = function(newtrade){
		$http.defaults.headers.common.Authorization = 'Matouxl '+ 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiRW1pbGUiLCJhZ2UiOjIzfSwiaWF0IjoxNTM0MzEyNzA1fQ.e9aWdZIwEBXZe8_MrHYl89kgEvzLVEPkTm6mIDbinPk';
		$scope.newtrade.creationDate = new Date();
		if($routeParams.tradeId!== undefined && $routeParams.tradeId!== null){
			$http.post('/user/update-specific-trade/'+$routeParams.tradeId,$scope.newtrade).success( 
				function(data,status, config){ 

			}).error( function(err,status, config){
				console.log(err,status);
				Notification.error( 'can\'t modify closed position!!!! ')
			})
		}else{
			$http.post('/user/create-trade/?userId='+userId,$scope.newtrade).success( function(data){
			Notification.success("A new trade on "+$scope.newtrade+" was created successfully.")				
			$location.url('/communityTrades');
			}).error( function(err){
				Notification.error("Trade was not created")
			})
		}
	};

	$scope.publishPrivate = function(newtrade){

	};
	var tardeDir = '/norrlab-users-2018';
	$scope.uploadFile = function(file){
 
		 if(file !==null){
		 	file.upload = Upload.upload({
                url:tardeDir,// '/norrlab-users-2018',
                
                file:file
            }).success( function (data,status,headers,config) {
            	 
            	 //Where must update the trade with the new image;
            	 $scope.newtrade.pictureUrl= tardeDir+'/'+data;
            }).error(  function (data,status,headers,config) {
            	 alert('error')
            });
 
		 }
	}


	$scope.notifyInvalidFiles = function(ala){

	};

	$scope.$watch('newtrade.pictureUrl', function(){
		if($scope.newtrade.pictureUrl !== undefined)
			$scope.pictureUploaded = true;
	});

	loadPage();

}]);