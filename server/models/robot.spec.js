'use strict';

require('should');
var robotModel = require('./robot.model');

describe('init', function() {
  it('creates the model with valid default values', function() {
    var model = new robotModel();
    model.should.have.property('x', 0);
    model.should.have.property('y', 0);
    model.should.have.property('direction', 'NORTH');
  });
});

describe('setDirection', function() {
  it('sets direction when valid values are specified', function() {
    var model = new robotModel();
    model.setDirection('North').should.equal(true);
    model.direction.should.equal('NORTH');

    model.setDirection('South').should.equal(true);
    model.direction.should.equal('SOUTH');

    model.setDirection('East').should.equal(true);
    model.direction.should.equal('EAST');

    model.setDirection('West').should.equal(true);
    model.direction.should.equal('WEST');
  });

  it('does not change direction for undefined values', function() {
    var model = new robotModel();
    model.setDirection('EAST'); // set a valid non-north value initially

    model.setDirection().should.equal(false);
    model.direction.should.equal('EAST');

    model.setDirection(0).should.equal(false);
    model.direction.should.equal('EAST');

    model.setDirection('124fqwf3').should.equal(false);
    model.direction.should.equal('EAST');
  });
});

describe('move', function() {

  function shouldNotMove(x, y, direction) {
    var robot = new robotModel(x, y, direction);
    robot.move();
    robot.x.should.equal(x);
    robot.y.should.equal(y);
  }

    function shouldMove(x, y, direction, destX, destY) {
    var robot = new robotModel(x, y, direction);
    robot.move();
    robot.x.should.equal(destX);
    robot.y.should.equal(destY);
  }

  it('should not adjust the position if the robot would move off the table', function() {
    // corners
    shouldNotMove(0, 0, 'South');
    shouldNotMove(0, 0, 'West');
    shouldNotMove(4, 4, 'North');
    shouldNotMove(4, 4, 'East');

    // corners
    shouldNotMove(0, 4, 'North');
    shouldNotMove(0, 4, 'West');
    shouldNotMove(4, 0, 'East');
    shouldNotMove(4, 0, 'South');

    // sides
    shouldNotMove(2, 4, 'North');
    shouldNotMove(2, 0, 'South');
    shouldNotMove(4, 2, 'East');
    shouldNotMove(0, 2, 'West');
  });

  it('should adjust the position if the robot has an adjacent square', function() {
    shouldMove(0, 0, 'North', 0, 1);
    shouldMove(0, 4, 'South', 0, 3);
    shouldMove(4, 2, 'West', 3, 2);
    shouldMove(0, 2, 'East', 1, 2);
  });
});

describe('rotateLeft', function() {
  it('should move to the next direction', function() {

    var order = ['NORTH', 'WEST', 'SOUTH', 'EAST'];
    var robot = new robotModel(0, 0, order[3]);

    for (var i = 0; i < order.length; i++) {
      robot.rotateLeft();
      robot.direction.should.equal(order[i]);
    }

  });
});

describe('rotateRight', function() {
  it('should move to the next direction', function() {

    var order = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    var robot = new robotModel(0, 0, order[3]);

    for (var i = 0; i < order.length; i++) {
      robot.rotateRight();
      robot.direction.should.equal(order[i]);
    }

  });
});

describe('getPositionReport', function() {
  it('should return the postion and direction', function() {

    var robot = new robotModel(3, 2, 'EAST');
    robot.getPositionReport().should.equal('At 3,2 facing EAST');

  });
});
