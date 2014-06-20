
(function () {
   angular
     .module("Horn")
     .directive('openFileDialog', ['$scope', function () {
        return {
          restrict: 'E',
          templateUrl: 'partial/openFileDialog.html',
          transclude: true,
          link: function ($scope, element, attrs) {

          },
          controller: function ($scope) {
            $scope.isVisible = true;
            $scope.files = [];
          }
        };
      }]);
})();
