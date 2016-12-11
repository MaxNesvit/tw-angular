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
