(function () {
  angular
    .module('Horn')
    .directive('codemirror', ['editor', function (editor) {
      return {
        restrict: 'E',
        templateUrl: 'partial/codemirror.html',
        link: function ($scope, element, attrs) {
          $scope.editor = editor;

          var textarea = element[0].getElementsByTagName('textarea')[0];
          editor.init(textarea);
        },
        controller: function () {

        }
      }
    }])
    .directive('hrnPreview', ['editor', function (editor) {
      return {
        restrict: 'A',
        templateUrl: 'partial/preview.html',
        link: function ($scope, element, attrs) {
          //$scope.html = editor.renderedText;
        }
      };
    }])
    .directive('viewModes', ['editor', function (editor) {
      return {
        restrict: 'E',
        templateUrl: 'partial/viewModes.html',
        link: function ($scope, element, attrs) {
          $scope.editor = editor;
        },
        controller: function () {

        }
      };
    }]);
})();
