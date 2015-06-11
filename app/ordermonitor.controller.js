(function() {
    'use strict';

    angular
        .module('ordermonitor')
        .controller('OrderMonitorController', OrderMonitorController);

    function OrderMonitorController() {

        var viewModel = this;
        viewModel.monitorRowsShown = 26;
        viewModel.indexOfFirstShownRow = 0;

        viewModel.rows = [];
        var names = ['juho', 'kari', 'matias', 'chao'];
        for (var i = 0; i < 300; i++) {
            viewModel.rows.push({number:i, square: i*i, cube: i*i*i, name: names[i%names.length]});
        }
        viewModel.selectedRowIndex = 0;
        viewModel.selectedNumber = viewModel.rows[viewModel.selectedRowIndex];

        viewModel.selectRow = function($index) {
            viewModel.selectedRowIndex = $index;
            viewModel.selectedNumber = viewModel.rows[$index].number;
        };

        viewModel.moveFocusUp = function() {
            if (viewModel.selectedRowIndex === 0) {
                return;
            }
            viewModel.selectRow(viewModel.selectedRowIndex-1);
        };

        viewModel.moveFocusDown = function() {
            if (viewModel.rows.length === viewModel.selectedRowIndex + 1) {
                return;
            }
            viewModel.selectRow(viewModel.selectedRowIndex+1);
        };

    }

})();