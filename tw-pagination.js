(function(currentScriptPath) {
    angular.module('twPagination', []).directive('twPagination', [function() {
        return {
            templateUrl: currentScriptPath.replace('tw-pagination.js', 'pagination.html'),
            restrict: 'E',
            scope: {
                itemCount: "=itemcount",
                change: "=change",
            },

            link: function (scope, element, attributes) {

                scope.initiated = false;

                scope.pageSize = +attributes['pagesize'];
                if (!scope.pageSize) scope.pageSize = 8;
                scope.pageCount = +attributes['pagecount'];
                if (!scope.pageCount) scope.pageCount = 4;
                scope.currentPage = +attributes['currentpage'];
                if (!scope.currentPage) scope.currentPage = 1;

                scope.totalPageCount = function() {
                    var pc = Math.ceil(scope.itemCount / scope.pageSize);
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
                    if (m - n < scope.pageCount) {
                        n = n - (scope.pageCount - (m - n)) + 1;
                    }
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
                    scope.setPages();
                });

                scope.goTo = function(page) {
                    if (page == scope.currentPage && scope.initiated) {
                        return;
                    }
                    scope.initiated = true;
                    scope.currentPage = page;
                    scope.setPages();
                    var firstItem = (scope.currentPage - 1) * scope.pageSize + 1;
                    var lastItem = firstItem + scope.pageSize - 1;
                    if (lastItem > scope.itemCount) {
                        lastItem = scope.itemCount;
                    }
                    scope.change(scope.currentPage, firstItem, lastItem);
                }

                scope.goTo(scope.currentPage);
            }
        }
    }]);
})(
    (function () {
        var scripts = document.getElementsByTagName("script");
        var currentScriptPath = scripts[scripts.length - 1].src;
        return currentScriptPath;
    })()
);
