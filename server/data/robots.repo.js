'use strict';

var _ = require('lodash');
var uuid = require('uuid');
var Q = require('q');

var robotConstants = require('./robots.constants');

var robotsCollection = [];

// Ensures the specified position is parseable as an integer and within the specified limits
function rectifyPosition(pos, min, max) {
  var posInt = parseInt(pos);
  return isNaN(posInt) || posInt < min || posInt > max ? 0 : posInt;
}

module.exports = {
  reset: function() {
    robotsCollection = [];
  },
  create: function(x, y, direction) {
    var robot = {
      id: uuid.v1(),
      x: rectifyPosition(x, robotConstants.limits.min.x, robotConstants.limits.max.x),
      y: rectifyPosition(y, robotConstants.limits.min.y, robotConstants.limits.max.y),
      direction: robotConstants.direction.parse(direction) || robotConstants.direction.N
    }
    robotsCollection.push(robot);

    return Q.resolve(robot);
  },
  list: function() {
    return Q.resolve(robotsCollection);
  },
  getById: function(id) {
    return Q.resolve(_.find(robotsCollection, {id: id}));
  },
  update: function(robot) {
    var deferred = Q.defer();
    if (!robot) {
      deferred.reject('No robot specified');
      return deferred.promise;
    }

    var storedRobot = _.find(robotsCollection, {id: robot.id});
    if (!storedRobot) {
      deferred.reject('No matching robot found');
      return deferred.promise;
    }

    storedRobot.x = robot.x;
    storedRobot.y = robot.y;
    storedRobot.direction = robot.direction;

    deferred.resolve();

    return deferred.promise;

  }
};
