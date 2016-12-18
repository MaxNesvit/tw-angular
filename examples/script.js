var exampleApp = angular.module('exampleApp', ['ngSanitize', 'twPagination', 'twCalendar', 'twToggle', 'twFile']);

exampleApp.controller('exampleCtrl', ['$scope', function ($scope) {

	$scope.data = {
		bool: false,
		date: "2016-12-01",
		pagecount: 5,
		pagesize: 6,
		file: null,
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

	$scope.onUpload = function(file) {
		alert('File ' + file.name + ' is ready to upload');
	}

	window.scope = $scope;

}]);

