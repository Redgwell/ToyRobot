'use strict';

angular.module('toyRobotApp')
  .directive('tail', function () {
    return function (scope, elem) {
        scope.$watch(function () {
          return elem[0].value;
        },
        function () {
          elem[0].scrollTop = elem[0].scrollHeight;
        });
    };
  });
