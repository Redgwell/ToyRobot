'use strict';

var _ = require('lodash');
var Q = require('q');

var robotModel = require('../models/robot.model');

var robotsCollection = [];

module.exports = {
  reset: function() {
    robotsCollection = [];
  },
  create: function(x, y, direction) {
    var robot = new robotModel(x, y, direction);

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

    storedRobot.setDirection(robot.direction);
    storedRobot.setPosition(robot.x, robot.y);

    deferred.resolve();

    return deferred.promise;

  }
};
