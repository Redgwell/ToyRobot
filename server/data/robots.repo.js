'use strict';

var _ = require('lodash');
var Q = require('q');

var robotModel = require('../models/robot.model');

var robotsCollection = [];

var robotRepo = function() {};
robotRepo.prototype = Object.create(require('events').EventEmitter.prototype);

robotRepo.prototype.reset = function() {
  robotsCollection = [];
};

robotRepo.prototype.create = function(x, y, direction) {
  var robot = new robotModel(x, y, direction);

  robotsCollection.push(robot);

  this.emit('robotCreated', robot);

  return Q.resolve(robot);
};

robotRepo.prototype.list = function() {
  return Q.resolve(robotsCollection);
};

robotRepo.prototype.getById = function(id) {
  return Q.resolve(_.find(robotsCollection, {id: id}));
};

robotRepo.prototype.update = function(robot) {
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

  this.emit('robotUpdated', storedRobot);

  deferred.resolve();

  return deferred.promise;

};

module.exports = new robotRepo();
