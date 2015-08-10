'use strict';

var uuid = require('uuid');
var q = require('q');

var robotConstants = require('./robots.constants');

var robotsCollection = [];

module.exports = {
  create: function() {
    var robot = {
      id: uuid.v1(),
      x: 0,
      y: 0,
      direction: robotConstants.direction.N
    }
    robotsCollection.push(robot);

    return q.resolve(robot);
  }
};
