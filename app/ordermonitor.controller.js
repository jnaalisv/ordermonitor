(function() {
    'use strict';

    angular
        .module('ordermonitor')
        .controller('OrderMonitorController', OrderMonitorController);

    function OrderMonitorController() {

        var LINE_HEIGHT = 31;

        var viewModel = this;
        viewModel.monitorRowsShown = 18;
        viewModel.indexOfFirstShownRow = 0;

        viewModel.getLineHeight = function() {
            return LINE_HEIGHT;
        };

        viewModel.getRowContainerPhysicalHeight = function() {
            return viewModel.rows.length * LINE_HEIGHT;
        };

        viewModel.rows = [];
        var names = ['juho', 'kari', 'matias', 'chao'];
        for (var i = 0; i < 300; i++) {
            viewModel.rows.push({number:i, square: i*i, cube: i*i*i, name: names[i%names.length]});
        }

        var selectedRowIndex = 0;
        viewModel.getSelectedRowIndex = function() {
            return selectedRowIndex;
        };

        viewModel.selectedNumber = viewModel.rows[selectedRowIndex];

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

        var selectRowByIndex = function(index) {
            if (index < viewModel.indexOfFirstShownRow && viewModel.indexOfFirstShownRow > 0) {
                viewModel.indexOfFirstShownRow--;
            } else if (index >= viewModel.indexOfFirstShownRow + viewModel.monitorRowsShown) {
                viewModel.indexOfFirstShownRow++;
            }

            selectedRowIndex = index;
            viewModel.selectedNumber = viewModel.rows[index].number;
        };

        viewModel.moveSelection = function(delta) {
            var newPosition = selectedRowIndex + delta;

            if (newPosition < 0 || viewModel.rows.length === newPosition) {
                return;
            }

            selectRowByIndex(newPosition);
        };
    }

})();