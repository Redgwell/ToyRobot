'use strict';

angular.module('toyRobotApp').service('interpreterService', function ($q, robotsService) {

  function place(commandArgs) {
    if (commandArgs.length < 3) {
      return $q.reject('Insufficient parameters');
    }

    var x = parseInt(commandArgs[0]);
    var y = parseInt(commandArgs[1]);
    var direction = commandArgs[2];

    return robotsService.createRobot(x, y, direction);
  }

  function commandResult(command, promiseFunc) {
    var deferred = $q.defer();

    promiseFunc().then(
      function(result) {
        deferred.resolve({ command: command, commandResult: result.data });
      },
      function(result) {
        deferred.reject(result.data.error);
      });

    return deferred.promise;
  }

  this.handleCommand = function(command, robotId) {
    if (!command) {
      return $q.reject('No command specified');
    }

    command = command.toUpperCase();

    var commandParts = command.split(' ');
    var instruction = commandParts[0];
    var commandArgs = commandParts.length > 1 ? commandParts[1].split(',') : [];

    switch (instruction) {
      case 'PLACE':
        return commandResult(instruction, function() { return place(commandArgs); });
      case 'REPORT':
        return commandResult(instruction, function() { return robotsService.getRobotReport(robotId); });
      case 'MOVE':
        return commandResult(instruction, function() { return robotsService.moveRobot(robotId); });
      case 'LEFT':
      case 'RIGHT':
        return commandResult(instruction, function() { return robotsService.rotateRobot(robotId, instruction); });
      default:
        return $q.reject('Unrecognised command: "' + instruction + '"');
    }
  };
});


