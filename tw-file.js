(function() {

    angular.module('twFile', []).directive('twFile', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                upload: '=upload',
                types: '=types',
                maxsize: '=maxsize',
            },
            link: function (scope, element, attr, ngModel) {

                ngModel.$validators.type = function(modelValue, viewValue) {
                    if (!element[0].files.length || !scope.types || !scope.types.length) return true;
                    var file = element[0].files[0];
                    return scope.types.indexOf(file.type) != -1;
                }

                ngModel.$validators.size = function(modelValue, viewValue) {
                    if (!element[0].files.length || !scope.maxsize) return true;
                    var file = element[0].files[0];
                    return file.size <= scope.maxsize;
                }

                $(element).on('change', function(event) {
                    if (!element[0].files.length) return;

                    var file = element[0].files[0];
                    ngModel.$setViewValue(file);

                    if (scope.upload) {
                        scope.upload(file);
                    }
                });

            }
        }
    });

})();