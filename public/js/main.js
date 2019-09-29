var uosApp = angular.module('uosApp',['LocalStorageModule','ui-notification','ngFileUpload','ngRoute','NorrLabUrls','ngMaterial','ngAria']);

uosApp.config( function ($routeProvider) {
	// body...

	
	$routeProvider.when('/home', {
      controller:'HomeController',
      templateUrl:'partials/home.html'
//      resolve: resolveProjects
    });
	 
	  
    $routeProvider.when('/news', {
	      controller:'NewsController',
	      templateUrl:'partials/news.html'
	    });
    $routeProvider.when('/economic-calendar', {
          controller:'HomeController',
          templateUrl:'partials/user-mgnt/economic-calendar.html'
        });

    $routeProvider.when('/news-detail/:newId', {
	      controller:'NewsController',
	      templateUrl:'partials/news-detail.html'
	    });

    $routeProvider.when('/communityTrades',{
    	controller:'communityTradesController',
    	templateUrl:'partials/community-trades.html'
    });

    $routeProvider.when('/tradeDetail/:tradeId',{
    	controller:'detailTradesController',
    	templateUrl:'partials/detail-trade.html'
    });

$routeProvider.when('/create-trade/',{
	controller:'UserTradeController',
	templateUrl:'partials/user-mgnt/edit-trade.html'
}); 


$routeProvider.when('/edite-trade/:tradeId',{
    controller:'UserTradeController',
    templateUrl:'partials/user-mgnt/edit-trade.html'
}); 

$routeProvider.when('/test/',{
	controller:'UserTradeController',
	templateUrl:'partials/device.html'
});

$routeProvider.when('/user-profile/:userId',{
    controller:'UserProfileConroller',
    templateUrl:'partials/user-mgnt/user-profile.html'
});

$routeProvider.otherwise('/home',{
    	controller:'HomeController',
    	templateUrl:'partials/home.html'
    })
});

uosApp.run( function ($rootScope,$location,localStorageService,ToolbarService,Notification) {
    // body...
    $rootScope.$on('$routeChangeStart', function (event,next, old) {
        // body...
        console.log(old)
        if(($location.path().startsWith("/create-trade/") || $location.path().startsWith("/edite-trade/")
            || $location.path().startsWith("/tradeDetail/")|| $location.path().startsWith("/user-profile/")) 
            && ToolbarService.getUser()==null){
            $location.url('/home')
        }
    })
})