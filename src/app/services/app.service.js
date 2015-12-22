(function() {
    'use strict';

    angular
        .module('app')
        .factory('DataService', DataService);

    DataService.$inject = ['$localStorage'];

    function DataService($localStorage) {

        return {
            submit: function(data) {
                $localStorage.data = data;
            }

        };
    }

})();