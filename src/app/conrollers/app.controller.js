(function() {
    'use strict';

    angular
        .module('app')
        .controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['DataService', '$scope', '$localStorage'];

    function MainCtrl(DataService, $scope, $localStorage) {

        var vm = this;

        vm.submit = submit;

        vm.data = {};

        activate();

        function submit() {
            if ($scope.defaultForm.$valid) {
                DataService.submit(vm.data);
            }
        }

        function activate() {
            vm.data = $localStorage.data;
        }
    }

})();