(function($) {
    angular.module('twToggle', []).directive('twToggle', function($parse) {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attr, ngModel) {
                var params = {};
                var a = $(element).data();
                for (i in a) {
                    params[i] = $(element).data(i);
                }
                $(element).bootstrapToggle(params);
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
    });
})(jQuery);
