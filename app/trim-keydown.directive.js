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

            var dummy = angular.element(scrollBar.childNodes[1]);
            dummy.css('height', $scope.controller.getRowContainerPhysicalHeight()+'px');

            $document.bind("keydown", function($event) {

                var charCode = $event.which || $event.keyCode;
                if (charCode === 38) {
                    $event.preventDefault();
                    moveSelection(-1);

                } else if (charCode === 40) {
                    $event.preventDefault();
                    moveSelection(1);
                }

            });

            $document.bind('wheel', function($event) {
                $event.preventDefault();

                var wheelChange = ($event.wheelDelta / 120) * -1; // invert scroll direction

                for (var i = 0; i < Math.abs(wheelChange) ; i++) {
                    moveSelection(wheelChange < 0 ? -1 : 1);
                }
            });

            var scrollBarElement = angular.element(scrollBar);
            scrollBarElement.bind('scroll', function($event) {

                var targetScrollTop = $event.target.scrollTop;
                var newIndex = Math.round(targetScrollTop / $scope.controller.getLineHeight());
                var indexDiff = ($scope.controller.getSelectedRowIndex() - newIndex)*-1;

                for (var i = 0; i < Math.abs(indexDiff) ; i++) {
                    moveSelection(indexDiff < 0 ? -1 : 1);
                }

            });

            function moveSelection(delta) {
                $scope.controller.moveSelection(delta);
                scrollBar.scrollTop = $scope.controller.getSelectedRowIndex() * $scope.controller.getLineHeight();
                $scope.$digest();
            }

        }
    }
})();