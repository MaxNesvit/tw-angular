var exampleApp = angular.module('exampleApp', ['ngSanitize', 'twPagination', 'twCalendar', 'twToggle']);

exampleApp.controller('exampleCtrl', ['$scope', function ($scope) {

	$scope.data = {
		bool: false,
		date: "2016-12-01",
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

}]);

