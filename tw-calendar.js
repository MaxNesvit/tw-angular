(function($) {
    angular.module('twCalendar', []).directive('twCalendar', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attr, ngModel) {
                $(element).datepicker({
                    autoclose: true,
                })
                $(element).addClass('datepicker');

                ngModel.$validators.date = function(modelValue, viewValue) {
                    var value = modelValue || viewValue;
                    if (!value) return true;
                    var d = new Date();
                    var options = {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    };
                    d = d.toLocaleString(navigator.locale, options);
                    d = d.replace(/\d/g, '\\d');
                    var regexp = new RegExp('^' + d + '$');
                    if (!regexp.test(value) && !/^\d{4,4}\-\d\d\-\d\d$/.test(value)) {
                        return false;
                    }
                    var d = Date.parse(value)
                    d = new Date(d);
                    if (!d) return false;
                    return true;
                }

                ngModel.$formatters.push(function (date) {
                    if (!date || date == '0000-00-00') return '';
                    var d = new Date(date);
                    var options = {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    };
                    d = d.toLocaleString(navigator.locale, options);
                    $(element).val(d);
                    return d;
                });

                ngModel.$parsers.push(function(value) {
                    var d = Date.parse(value)
                    d = new Date(d);
                    d = d.getFullYear() + '-' + getMonth(d) + '-' + getDate(d);
                    return d;
                });

                function getMonth(d) {
                    var month = d.getMonth() + 1;
                    if (month < 10) {
                        month = '0' + month;
                    }
                    return month;
                }

                function getDate(d) {
                    var date = d.getDate();
                    if (date < 10) {
                        date = '0' + date;
                    }
                    return date;
                }

            },
        }
    });
})(jQuery);
