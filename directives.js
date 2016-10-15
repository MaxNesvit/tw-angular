// input with pop up calendar
function twCalendar() {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attr, ngModel) {
			$(element).datepicker({
				dateFormat: 'm/d/yy',
			});
			$(element).addClass('datepicker');

			if (!ngModel) return;
			initialValue();

			ngModel.$validators.invalidDate = function(modelValue, viewValue) {
				var value = modelValue || viewValue;
				if (!value) return true;
				var res = true;
				if (!/^\d\d?\/\d\d?\/\d{4,4}$/.test(value) && !/^\d{4,4}\-\d\d\-\d\d$/.test(value)) {
					res = false;
				}
				return res;
			}

			ngModel.$formatters.push(function (date) {
				if (!date) return '';
				var a = date.split(' ');
				a = a[0].split('-');
				if (a.length != 3) return date;
				var d = new Date(a[0], a[1]-1, a[2]);
				return (d.getMonth() + 1) +'/' + d.getDate() + '/' + d.getFullYear();
			});

			function initialValue() {
				if (attr.today && !ngModel.$viewValue) {
					var d = new Date();
					var d = (d.getMonth() + 1) +'/' + d.getDate() + '/' + d.getFullYear();
					ngModel.$setViewValue(d);
					$(element).val(d);
				}
			}
		},
	}
}

// filter YYYY-MM-dd -> MM/dd/YYYY
function twDate(date) {
	if (!date) return '';
	var d = date.split(' ');
	var a = d[0].split('-');
	return a[1] + '/' + a[2] + '/' + a[0];
}

// prevent all external events if clicked on this element
function twClickOutside() {
	return {
		restrict: 'A',
		link: function (scope, element, attr) {
			element.bind('click', function(event) {
				event.stopPropagation();
			});
		}
	}
}

// bootstrap toggle button for angular
function twToggle($parse) {
	return {
		restrict: 'A',
		require: '?ngModel',
		link: function(scope, element, attr, ngModel) {
			var on = $(element).data('on');
			var off = $(element).data('off');
			var style = $(element).data('style');
			var height  = $(element).data('height');
			$(element).bootstrapToggle({
				on: on ? on : 'Enabled',
				off: off? off : 'Disabled',
				style: style ? style : "btn-sm custom",
				height: height ? height : 20,
			});
			var modelGetter = $parse(attr.ngModel);
			var initialValue = modelGetter(scope);
			if (initialValue > 0) {
				$(element).bootstrapToggle('on');
			}
			$(element).change(function() {
				ngModel.$setViewValue($(element).prop('checked'));
			});
		}
	}
}

function twPagination() {
    return {
        templateUrl: 'partial/pagination.html',
        restrict: 'E',
        scope: {
            itemCount: "=itemcount",
            /*pageSize: "=pagesize",
            currentPage: "=currentpage",
            pageCount: "=pagecount",*/
            change: "=change",
        },

        link: function (scope, element, attributes) {

			scope.pageSize = $(element).data('pagesize');
            if (!scope.pageSize) {
                scope.pageSize = 8;
            }
			scope.currentPage = $(element).data('currentpage');
            if (!scope.currentPage) {
                scope.currentPage = 1;
            }
            scope.pageCount = $(element).data('pagecount');
            if (!scope.pageCount) {
                scope.pageCount = 4;
            }

            scope.totalPageCount = function() {
                var pc = Math.ceil(scope.itemCount / scope.pageSize);
                console.log(scope.itemCount, scope.pageSize, pc);
                if (scope.pageCount > pc) {
                    scope.pageCount = pc;
                }
                return pc;
            }

            scope.setPages = function() {
                scope.pages = [];
                var shift = Math.floor(scope.pageCount / 2);
                var n = scope.currentPage - shift;
                if (n < 1) n = 1;
                var m = n + scope.pageCount - 1;
                var pc = scope.totalPageCount();
                if (m > pc) m = pc;
                if (m - n < scope.pageCount) n = n - (scope.pageCount - (m - n)) + 1;
                if (n < 1) n = 1;
                for (i=n; i<=m; i++) {
                    scope.pages.push(i);
                }
                scope.showPrev = scope.currentPage > 1;
                scope.prev = scope.currentPage - 1;
                scope.showNext = scope.currentPage < pc;
                scope.next = scope.currentPage + 1;
                scope.show = scope.pageCount > 1;
                setTimeout(function() {scope.$digest();}, 100);
            }

            scope.$watch('itemCount', function(){
                console.log(scope.itemCount);
                scope.setPages();
            });

            scope.goTo = function(page) {
                if (page == scope.currentPage) {
                    return;
                }
                scope.currentPage = page;
                scope.setPages();
				var firstItem = (scope.currentPage - 1) * scope.pageSize + 1;
				var lastItem = firstItem + scope.pageSize - 1;
				if (lastItem > scope.itemCount) lastItem = scope.itemCount;
                scope.change(scope.currentPage, firstItem, lastItem);
            }

            scope.totalPageCount();
            scope.setPages();
        }
    }
}
