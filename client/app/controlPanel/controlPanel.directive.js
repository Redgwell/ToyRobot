'use strict';

angular.module('toyRobotApp')
  .directive('controlPanel', function () {
    return {
      templateUrl: 'app/controlPanel/controlPanel.html',
      restrict: 'E',
      link: function (scope, element, attrs) {
      }
    };
  });
