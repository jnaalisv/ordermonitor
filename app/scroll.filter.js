(function() {

    angular
        .module('ordermonitor')
        .filter('scrollFilter', scrollFilter);

    function scrollFilter(){
        return function(orderRows, numberOfRowsToShow, indexOfFirstShownRow){
            return orderRows.slice(indexOfFirstShownRow, indexOfFirstShownRow + numberOfRowsToShow);
        };
    }

})();