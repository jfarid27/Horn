/**
 * Directive for representing content of current tab
 */

(function () {
   angular
     .module("Horn")
     .directive('tab', [function () {
        return {
          restrict: 'E',
          templateUrl: 'partial/tab.html',
          transclude: true,
          link: function ($scope, element, attrs) {

          }
        };
      }]);
})();
