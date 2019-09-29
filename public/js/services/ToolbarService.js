uosApp.factory('ToolbarService',['localStorageService','$rootScope', '$http',
 function (localStorageService,$rootScope, $http) {
	// body...
	return{
		login : function (user) {
			// body...
			this.setUser(user);
			localStorageService.set("userIsLoggedIn", true);

		},
		setUser: function (user) {
			// body...
			localStorageService.set("logedUser", user);
		},
		getUser: function () {
			// body...
			return localStorageService.get("logedUser");
		},
		clearAll: function () {
			// body...
			localStorageService.clearAll(); 
		}
	}
}])