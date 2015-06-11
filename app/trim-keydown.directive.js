(function() {
    angular
        .module('ordermonitor')
        .directive('trimKeydown', trimKeydown);

    function trimKeydown($document) {
        return {
            link : linkFunction
        };

        function linkFunction($scope, $element) {

            $document.bind("keydown", handleKeydown);

            function handleKeydown($event) {
                var charCode = $event.which || $event.keyCode;
                if (charCode === 38) {
                    $scope.controller.moveFocusUp();
                } else if (charCode === 40) {
                    $scope.controller.moveFocusDown();
                }
                $scope.$digest();
            }
        }
    }
})();