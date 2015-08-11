'use strict';

angular.module('toyRobotApp')
  .directive('controlPanel', function () {
    return {
      templateUrl: 'app/controlPanel/controlPanel.html',
      restrict: 'E',
      require: 'ngModel',
      scope: {
        currentRobot: '=ngModel'
      },
      controller: function($scope, robotsService, interpreterService) {
        $scope.availableRobots = [];
        $scope.commandHistory = '';
        $scope.currentCommand = '';

        function log(message) {
          $scope.commandHistory += message + '\n';
        }

        $scope.submitCommand = function() {
          log('submitting command ' + $scope.currentCommand);
          var robotId = $scope.currentRobot ? $scope.currentRobot.id : 0;
          interpreterService.handleCommand($scope.currentCommand, robotId).then(function(result) {
            if (result.command === 'PLACE') {
              $scope.currentRobot = result.commandResult;
            }
          }, function(err) {
            log(err);
            if (!$scope.currentRobot) {
              log('Have you placed or selected a robot yet?');
            }
          });
          $scope.currentCommand = '';
        };

        log('Getting robot list...');
        robotsService.getRobots().success(function(result) {
          $scope.availableRobots = result;
          log('Received ' + result.length + ' robot(s)');
          console.log($scope.availableRobots);
        });

      }
    };
  });
