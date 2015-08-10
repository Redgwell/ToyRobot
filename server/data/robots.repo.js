'use strict';

var uuid = require('uuid');
var q = require('q');

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

    return q.resolve(robot);
  },

  list: function() {
    return q.resolve(robotsCollection);
  }
};
