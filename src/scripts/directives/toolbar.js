(function () {
  angular
    .module("Horn")
    .directive('toolbar', ['editor', function (editor) {
      return {
        restrict: 'E',
        templateUrl: 'partial/toolbar.html',

        link: function ($scope, element, attrs) {
          $scope.editor = editor;
        },

        scope: {
        },

        transclude: true,
        controller: function ($scope) {
          $scope.saveFile = function () {

          }
        }
      };
    }]);
})();
