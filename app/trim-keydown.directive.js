(function() {
    angular
        .module('ordermonitor')
        .directive('trimKeydown', trimKeydown);

    function trimKeydown($document) {
        return {
            link : linkFunction
        };

        function linkFunction($scope, $element) {
            $document.bind("keydown", function($event) {

                var lineHeight = 31;
                var delta = 0;

                var charCode = $event.which || $event.keyCode;
                if (charCode === 38) {
                    $scope.controller.moveFocusUp();
                    delta = -lineHeight;
                } else if (charCode === 40) {
                    $scope.controller.moveFocusDown();
                    delta = lineHeight;
                }

                $element[0].scrollTop = $element[0].scrollTop + delta;

                $event.preventDefault();
                $scope.$digest();
            });
        }
    }
})();