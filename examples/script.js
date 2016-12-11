var exampleApp = angular.module('exampleApp', ['ngSanitize', 'twPagination', 'twCalendar']);

exampleApp.controller('exampleCtrl', ['$scope', function ($scope) {

	$scope.data = {
		bool: false,
		date: '2016-10-25',
		pagecount: 5,
		pagesize: 6,
	}

	$scope.items = [];
	for (i=1; i<=50; i++) {
		$scope.items.push('Item #' + i);
	}

	$scope.goToPage = function(n, first, last) {
		$scope.pageText = '<h3>Page #' + n + '</h3><ul>';
		for (i=first; i<=last; i++) {
			$scope.pageText += '<li>' + $scope.items[i-1] + '</li>';
		}
		$scope.pageText += '</ul>';
	}

	$scope.goToPage(1, 1, 6);

	window.scope = $scope;

}]);

exampleApp.directive('twToggle', function($parse) {
	return twToggle($parse);
});

exampleApp.filter('twDate', function() {
	return function(input) {
		return twDate(input);
	}
});