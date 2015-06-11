(function() {
    angular
        .module('ordermonitor')
        .directive('trimKeydown', trimKeydown);

    function trimKeydown($document) {
        return {
            link : linkFunction
        };

        function linkFunction($scope, $element) {

            var scrollBar = $element[0].childNodes[1];

            $scope.controller.setScrollBar(scrollBar);

            var dummy = angular.element(scrollBar.childNodes[1]);
            dummy.css('height', $scope.controller.rows.length* $scope.controller.LINE_HEIGHT+'px');

            $document.bind("keydown", function($event) {

                var charCode = $event.which || $event.keyCode;
                if (charCode === 38) {
                    $event.preventDefault();
                    $scope.controller.moveFocusUp();
                    $scope.$digest();

                } else if (charCode === 40) {
                    $event.preventDefault();
                    $scope.controller.moveFocusDown();
                    $scope.$digest();
                }


            });

            $document.bind('wheel', function($event) {

                $event.preventDefault();

                var wheelChange = ($event.wheelDelta / 120) * -1; // invert scroll direction


                if (wheelChange === 0) {
                    return;
                }

                for (var i = 0; i < Math.abs(wheelChange) ; i++) {
                    $scope.controller.moveFocus(wheelChange < 0 ? -1 : 1);
                }

            });

            $document.bind('scroll', function($event) {

            });
        }
    }
})();