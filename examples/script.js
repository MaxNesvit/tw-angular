var exampleApp = angular.module('exampleApp', ['ngSanitize']);

exampleApp.controller('exampleCtrl', ['$scope', function ($scope) {

	$scope.data = {
		bool: false,
		date: '',
	}

	$scope.items = [];
	for (i=1; i<=20; i++) {
		$scope.items.push('Item #' + i);
	}

	$scope.goToPage = function(n, first, last) {
		console.log(n, first, last);
		$scope.pageText = '<h3>Page #' + n + '</h3><ul>';
		for (i=first; i<=last; i++) {
			$scope.pageText += '<li>' + $scope.items[i-1] + '</li>';
		}
		$scope.pageText += '</ul>';
	}

	$scope.goToPage(1, 1, 8);

	window.scope = $scope;

}]);

exampleApp.directive('twPagination', [function() {
	return twPagination();
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