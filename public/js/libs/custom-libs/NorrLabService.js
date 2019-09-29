var NorrLabService = angular.module('NorrLabService',[])
.service('NorrLab', function(){
	this.getHomdeVide = function(){
		$http.get('/norrLabHomeVideo').then( function(data){
		return data;
		}, function(err){
			console.log(err)
		})
	}
})