(function() {
    'use strict';

    angular
        .module('app')
        .directive('initialdirective', InitialDirective);

    function InitialDirective() {
        /*var directive = {
         restrict: 'EA',
         template: '<a href="">initial directive</a>',
         scope: false,
         link: linkFunc
         };
         return directive;
         function linkFunc(scope, element) {
         element.bind('click', function(){
         alert('I am working!');
         })
         }*/
    }

})();
