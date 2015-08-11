'use strict';

var _ = require('lodash');
var uuid = require('uuid');

var limits = {
  min: { x: 0, y: 0 },
  max: { x: 4, y: 4 }
};

var directions = ['NORTH', 'EAST', 'SOUTH', 'WEST'];

function rectifyPosition(pos, min, max) {
  var posInt = parseInt(pos);
  return isNaN(posInt) || posInt < min || posInt > max ? 0 : posInt;
}

var robot = function(x, y, direction) {
  this.id = uuid.v4();
  this.setPosition(x, y);
  this.direction = 'NORTH'; // default to North, and then try and set direction to the value specified
  this.setDirection(direction);
};

robot.prototype.setDirection = function(direction) {
  if (!direction) {
    return false;
  }

  var index = _.indexOf(directions, direction.toUpperCase());
  if (index === -1) {
    return false;
  }

  this.direction = directions[index];
  return true;
};

robot.prototype.setPosition = function(x, y) {
  this.x = rectifyPosition(x, limits.min.x, limits.max.x);
  this.y = rectifyPosition(y, limits.min.y, limits.max.y);
};

robot.prototype.move = function() {
  // figure out the x/y delta:
  var newX = this.x, newY = this.y;
  switch (this.direction.toLowerCase()) {
    case 'north':
      newY = this.y + 1;
      break;
    case 'south':
      newY = this.y - 1;
      break;
    case 'east':
      newX = this.x + 1;
      break;
    case 'west':
      newX = this.x - 1;
      break;
    default:
      return;
  }

  this.x = newX < limits.min.x || newX > limits.max.x ? this.x : newX;
  this.y = newY < limits.min.y || newY > limits.max.y ? this.y : newY;
};

robot.prototype.rotateLeft = function() {
  var index = _.indexOf(directions, this.direction) - 1;
  if (index === -1) {
    index = directions.length - 1;
  }
  this.direction = directions[index];
}

robot.prototype.rotateRight = function() {
  var index = _.indexOf(directions, this.direction) + 1;
  if (index === directions.length) {
    index = 0;
  }
  this.direction = directions[index];
}

robot.prototype.getPositionReport = function() {
  return 'At ' + this.x + ',' + this.y + ' facing ' + this.direction;
};

module.exports = robot;
