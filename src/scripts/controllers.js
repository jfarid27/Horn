'use strict';

(function () {
  angular
    .module("Horn", ['ngSanitize'])
    .controller('HornController', ['$scope', function ($scope) {
      $scope.version = "1.0.0";
    }]);

})();
