var exampleApp = angular.module('exampleApp', []);

exampleApp.controller('exampleCtrl', ['$scope', function ($scope) {

	$scope.data = {
		bool: false,
		date: '',
	}

	window.scope = $scope;

}]);

exampleApp.directive('twToggle', function($parse) {
	return twToggle($parse);
});

exampleApp.directive('twCalendar', function($parse) {
	return twCalendar($parse);
});

exampleApp.filter('twDate', function() {
	return function(input) {
		return twDate(input);
	}
});