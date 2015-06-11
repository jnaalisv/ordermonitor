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

    }

})();