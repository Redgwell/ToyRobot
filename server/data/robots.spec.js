'use strict';

var should = require('should');
var repo = require('./robots.repo');
var robotConstants = require('./robots.constants');

describe('constants.direction', function() {
  it('parse returns true for defined values', function() {
    robotConstants.direction.parse('N').should.equal('North');
    robotConstants.direction.parse('S').should.equal('South');
    robotConstants.direction.parse('E').should.equal('East');
    robotConstants.direction.parse('W').should.equal('West');

    robotConstants.direction.parse('North').should.equal('North');
    robotConstants.direction.parse('South').should.equal('South');
    robotConstants.direction.parse('East').should.equal('East');
    robotConstants.direction.parse('West').should.equal('West');
  });

  it('parse returns false for undefined values', function() {
    should.not.exist(robotConstants.direction.parse());
    should.not.exist(robotConstants.direction.parse(0));
    should.not.exist(robotConstants.direction.parse('d23f3weg'));
  });
});

describe('repo.create', function() {

  function assertRobotHasProperties(robot, x, y, direction) {
      robot.should.have.property('id')
      robot.id.length.should.be.greaterThan(0);
      robot.should.have.property('x', x);
      robot.should.have.property('y', y);
      robot.should.have.property('direction', direction);
  }

  it('should return a new robot at position 0,0 facing North when no arguments are specified', function(done) {
    repo.create().then(function(robot) {
      assertRobotHasProperties(robot, 0, 0, robotConstants.direction.N);
      done();
    });
  });

  it('should return a new robot at position 0,0 facing North when invalid arguments are specified', function(done) {
    repo.create(-3, -1, 'nowhere').then(function(robot) {
      assertRobotHasProperties(robot, 0, 0, robotConstants.direction.N);
      done();
    });
  });

  it('should return a new robot at the specified position and direction when valid arguments are specified', function(done) {
    repo.create(3, 2, 'East').then(function(robot) {
      assertRobotHasProperties(robot, 3, 2, robotConstants.direction.E);
      done();
    });
  });

});
