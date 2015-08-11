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
      controller: function($scope, robotsService, interpreterService, EventClient) {
        $scope.availableRobots = [];
        $scope.commandHistory = '';
        $scope.currentCommand = '';
        $scope.selectedId = null;

        function log(message) {
          $scope.commandHistory += message + '\n';
        }

        new EventClient(
          function onCreate(robot) {
            $scope.$apply(function() {
              $scope.availableRobots.push(robot);
            });
          },
          function onUpdate(robot) {
            $scope.$apply(function() {
              angular.forEach($scope.availableRobots, function(v) {
                if (v.id === robot.id) {
                  v.x = robot.x;
                  v.y = robot.y;
                  v.direction = robot.direction;
                }
              });
              if ($scope.currentRobot && $scope.currentRobot.id === robot.id) {
                $scope.currentRobot = robot;
              }
            });
          }
        );

        $scope.$watch('selectedId', function(id) {
          for (var i = 0; i < $scope.availableRobots.length; i++) {
            if ($scope.availableRobots[i].id === id) {
              $scope.currentRobot = $scope.availableRobots[i];
            }
          }
        });

        $scope.submitCommand = function() {
          log('submitting command ' + $scope.currentCommand);
          var robotId = $scope.currentRobot ? $scope.currentRobot.id : 0;
          interpreterService.handleCommand($scope.currentCommand, robotId).then(function(result) {
            switch (result.command) {
              case 'PLACE':
                $scope.currentRobot = result.commandResult;
                $scope.selectedId = $scope.currentRobot.id;
                break;
              case 'REPORT':
                log(result.commandResult.report);
                break;
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
        });

      }
    };
  });
