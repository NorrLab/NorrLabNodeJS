uosApp.controller( "NewsController", ['$scope','$location','UrlService','$http','$timeout',function($scope,$location,UrlService,$http, $timeout) {
	
	 $scope.norrNews=[{
	 	 	title:"Le rapprochement du Cremlin eu Europe",
	 	 	picture:"images/tradings/news/cotationindice.jpg",
	 	 	description:" Turque impact l'ensemble des Marchés WEBINAIRES / LIVE11 re Turque impact l’ensemble des Marchés Tester gratuitement la plateforme de trading Next Generation chez le broker CMC Markets : http://track.adform.net/C/?bn=16541709;C=0. Session de trading en direct à l’occasion de la publication de news US (CPI) et CAD (chômage),"


	 	 },{
	 	 	title:"La livre turque gagne plus de 4,8%.",
	 	 	picture:"images/tradings/news/livre-turque.jpg",
	 	 	description:"Live Trading : l’effondrement de la Livre Turque impact l'ensemble des Marchés WEBINAIRES / LIVE11 AOÛT 2018 Live Trading : l’effondrement de la Livre Turque impact l’ensemble des Marchés Tester gratuitement la plateforme de trading Next Generation chez le broker CMC Markets : http://track.adform.net/C/?bn=16541709;C=0. Session de trading en direct à l’occasion de la publication de news US (CPI) et CAD (chômage),"

	 	 },{
	 	 	title:"Le Cac40 est il en train de chutter.",
	 	 	picture:"images/tradings/news/cac40.jpg",
	 	 	description:"Live Trading : l’effondrement de la Livre Turque impacCMC Markets : http://track.adfws US (CPI) et CAD (chômage),"

	 	 }];
 	 $scope.hasePicture = function(){
 	 	return true;
 	 };

 	 $scope.watchNews = function(newId){
 	 	 $location.url("/news-detail/"+33)
 	 }

}]);