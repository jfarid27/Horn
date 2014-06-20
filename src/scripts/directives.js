
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

(function () {
  angular
    .module("Horn")
    .directive('toolbar', ['editor', 'openFileDialog', function (editor, openFileDialog) {
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
