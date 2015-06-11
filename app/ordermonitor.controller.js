(function() {
    'use strict';

    angular
        .module('ordermonitor')
        .controller('OrderMonitorController', OrderMonitorController);

    function OrderMonitorController($scope) {

        var scrollBar;

        var viewModel = this;
        viewModel.monitorRowsShown = 18;
        viewModel.indexOfFirstShownRow = 0;
        viewModel.LINE_HEIGHT = 31;

        viewModel.rows = [];
        var names = ['juho', 'kari', 'matias', 'chao'];
        for (var i = 0; i < 300; i++) {
            viewModel.rows.push({number:i, square: i*i, cube: i*i*i, name: names[i%names.length]});
        }
        viewModel.selectedRowIndex = 0;
        viewModel.selectedNumber = viewModel.rows[viewModel.selectedRowIndex];

        viewModel.setScrollBar = function(element) {
            scrollBar = element;
        };

        viewModel.selectRow = function(row) {
            var newIndex = findRealIndexByNumber(row.number);

            selectRowByIndex(newIndex);
        };

        function findRealIndexByNumber(number) {
            for(var i = 0; i < viewModel.rows.length; i++) {
                if (viewModel.rows[i].number === number) {
                    return i;
                }
            }
            console.log('error, didn\'t find real index for ' + number);
            return 0;
        }


        viewModel.moveFocusUp = function() {
            if (viewModel.selectedRowIndex === 0) {
                return;
            }
            selectRowByIndex(viewModel.selectedRowIndex-1);
        };

        viewModel.moveFocusDown = function() {
            if (viewModel.rows.length === viewModel.selectedRowIndex + 1) {
                return;
            }
            selectRowByIndex(viewModel.selectedRowIndex+1);
        };

        var selectRowByIndex = function(index) {
            if (index < viewModel.indexOfFirstShownRow && viewModel.indexOfFirstShownRow > 0) {
                viewModel.indexOfFirstShownRow--;
            } else if (index >= viewModel.indexOfFirstShownRow + viewModel.monitorRowsShown) {
                viewModel.indexOfFirstShownRow++;
            }
            
            scrollBar.scrollTop = index * viewModel.LINE_HEIGHT;

            viewModel.selectedRowIndex = index;
            viewModel.selectedNumber = viewModel.rows[index].number;
        };

        viewModel.moveFocus = function(amount) {
            var newPosition = viewModel.selectedRowIndex + amount;

            if (newPosition < 0 || viewModel.rows.length === newPosition) {
                return;
            }

            selectRowByIndex(newPosition);

            $scope.$digest();
        };
    }

})();