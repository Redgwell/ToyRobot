'use strict';

var uuid = require('uuid');

var limits = {
  min: { x: 0, y: 0 },
  max: { x: 4, y: 4 }
};

function rectifyPosition(pos, min, max) {
  var posInt = parseInt(pos);
  return isNaN(posInt) || posInt < min || posInt > max ? 0 : posInt;
}

var robot = function(x, y, direction) {
  this.id = uuid.v1();
  this.setPosition(x, y);
  this.direction = 'North'; // default to North, and then try and set direction to the value specified
  this.setDirection(direction);
};

robot.prototype.setDirection = function(direction) {
  if (!direction) return;
  switch (direction.toLowerCase()) {
    case 'north':
      this.direction = 'North';
      break;
    case 'south':
      this.direction = 'South';
      break;
    case 'east':
      this.direction = 'East';
      break;
    case 'west':
      this.direction = 'West';
      break;
  }
};

robot.prototype.setPosition = function(x, y) {
  this.x = rectifyPosition(x, limits.min.x, limits.max.x);
  this.y = rectifyPosition(y, limits.min.y, limits.max.y);
};

module.exports = robot;
