(function($) {

    angular.module('twFile', []).directive('twFile', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                upload: '=upload',
            },
            link: function (scope, element, attr, ngModel) {

                $(element).on('change', function(event) {
                    if (!element[0].files) return;
                    var file = element[0].files[0];
                    ngModel.$setViewValue(file);
                    if (scope.upload) {
                        scope.upload(file);
                    }
                });

            }
        }
    });

})(jQuery);