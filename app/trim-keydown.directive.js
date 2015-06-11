(function() {
    angular
        .module('ordermonitor')
        .directive('trimKeydown', trimKeydown);

    function trimKeydown($document) {
        return {
            link : linkFunction
        };

        function linkFunction($scope, $element) {

            var LINE_HEIGHT = 31;

            var scrollBar = $element[0].childNodes[1];

            var dummy = angular.element(scrollBar.childNodes[1]);
            dummy.css('height', $scope.controller.rows.length*LINE_HEIGHT+'px');

            $document.bind("keydown", function($event) {
                
                var scrollDelta = 0;
                var charCode = $event.which || $event.keyCode;
                if (charCode === 38) {
                    $scope.controller.moveFocusUp();
                    scrollDelta = -LINE_HEIGHT;
                } else if (charCode === 40) {
                    $scope.controller.moveFocusDown();
                    scrollDelta = LINE_HEIGHT;
                }


                scrollBar.scrollTop = scrollBar.scrollTop + scrollDelta;

                $event.preventDefault();
                $scope.$digest();
            });
        }
    }
})();