(function() {
    angular.module('twCalendar', []).directive('twCalendar', function() {
        return {
            restrict: 'A',
            require: '?ngModel',
            link: function(scope, element, attr, ngModel) {
                $(element).datepicker({
                    /*format: 'yyyy-mm-dd',*/

                    autoclose: true,
                }).on('changeDate', function(e) {
                    var d = scope.toDbFormat(e.date);
                    console.log(d);
                    ngModel = d;
                });
                $(element).addClass('datepicker');

                if (!ngModel) return;
                initialValue();

                scope.toDbFormat = function(d) {
                    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                }

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
                    var d = new Date(date); console.log(d);
                    /*var a = date.split(' ');
                     a = a[0].split('-');
                     if (a.length != 3) return date;
                     var d = new Date(a[0], a[1]-1, a[2]);*/
                    d = (d.getMonth() + 1) +'/' + d.getDate() + '/' + d.getFullYear();
                    $(element).val(d);
                    return d;
                });

                function initialValue() {return;
                    if (attr.today && !ngModel.$viewValue) {
                        var d = new Date();
                        var d = (d.getMonth() + 1) +'/' + d.getDate() + '/' + d.getFullYear();
                        ngModel.$setViewValue(d);
                        $(element).val(d);
                    }
                }
            },
        }
    });
})();
