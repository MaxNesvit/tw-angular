(function($) {

    angular.module('twFile', []).directive('twFile', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                upload: '=upload',
                error: '=error',
                options: '=options',
            },
            link: function (scope, element, attr, ngModel) {

                scope.errors = [];

                scope.addError = function(msg) {
                    scope.errors.push(msg);
                }

                scope.showErrors = function(file) {
                    if (scope.error) {
                        scope.error(file, scope.errors);
                    }
                    return scope.errors;
                }

                scope.validate = function(file) {

                    scope.errors = [];

                    if (!scope.options) return true;

                    if (scope.options.mimes) {
                        if (!~scope.options.mimes.indexOf(file.type)) {
                            scope.addError('Wrong file type: ' + file.type);
                        }
                    }

                    if (scope.options.maxSize) {
                        if (+scope.options.maxSize < file.size) {
                            scope.addError('File is too large, max file size is ' + scope.options.maxSize);
                        }
                    }

                    return !scope.errors.length;
                }

                $(element).on('change', function(event) {
                    if (!element[0].files) return;

                    var file = element[0].files[0];
                    if (!scope.validate(file)) {
                        return scope.showErrors(file);
                    }

                    ngModel.$setViewValue(file);

                    if (scope.upload) {
                        scope.upload(file);
                    }
                });

            }
        }
    });

})(jQuery);