'use strict';

var should = require('should');
var repo = require('./robots.repo');
var uuid = require('uuid');

describe('repo tests', function() {

  function assertRobotHasProperties(robot, x, y, direction) {
    robot.should.have.property('id');
    robot.id.length.should.be.greaterThan(0);
    robot.should.have.property('x', x);
    robot.should.have.property('y', y);
    robot.should.have.property('direction', direction);
  }

  describe('repo.create', function() {

    it('should return a new robot at position 0,0 facing North when no arguments are specified', function(done) {
      repo.create().then(function(robot) {
        assertRobotHasProperties(robot, 0, 0, 'NORTH');
        done();
      });
    });

    it('should return a new robot at position 0,0 facing North when invalid arguments are specified', function(done) {
      repo.create(-3, -1, 'nowhere').then(function(robot) {
        assertRobotHasProperties(robot, 0, 0, 'NORTH');
        done();
      });
    });

    it('should return a new robot at the specified position and direction when valid arguments are specified', function(done) {
      repo.create(3, 2, 'East').then(function(robot) {
        assertRobotHasProperties(robot, 3, 2, 'EAST');
        done();
      });
    });

    it('should emit a robotCreated event when a new robot has been created', function(done) {
      var handler = function(robot) {
        repo.removeListener('robotCreated', handler);
        assertRobotHasProperties(robot, 3, 2, 'EAST');
        done();
      };
      repo.addListener('robotCreated', handler);

      repo.create(3, 2, 'East');
    });

  });

  describe('repo.reset', function() {
    it('should clear the collection of all robots', function(done) {
      repo.reset();
      repo.list().then(function(robots) {
        robots.length.should.be.equal(0);
        done();
      });
    });
  });

  describe('repo.list', function() {
    beforeEach(function() {
      repo.reset();
    });

    it('should return an empty list when the repo is new', function(done) {
      repo.list().then(function(robots) {
        robots.length.should.be.equal(0);
        done();
      });
    });

    it('should return all robots added to the list when robots have been created', function(done) {
      repo.create().then(function() { repo.create().then(
        function() {
          repo.list().then(function(robots) {
            robots.length.should.be.equal(2);
            done();
          });
        });
      });
    });
  });

  describe('repo.getById', function() {

    it('should return null if an invalid id is specified', function(done) {
      repo.getById().then(function(robot) {
        should.not.exist(robot);
        done();
      });
    });

    it('should return null if a valid but missing id is specified', function(done) {
      repo.getById(uuid.v4()).then(function(robot) {
        should.not.exist(robot);
        done();
      });
    });

    it('should return a robot when a valid id is specified', function(done) {
      repo.create().then(function(newRobot) {
        repo.getById(newRobot.id).then(
          function(robot) {
            robot.should.have.property('id', newRobot.id);
            done();
        });
      });
    });
  });

  describe('repo.update', function() {

    it('should return error if no robot is specified', function(done) {
      repo.update().then(function(){}, function(err) {
        err.length.should.be.greaterThan(0);
        done();
      });
    });

    it('should return error if robot is specified without matching id', function(done) {
      repo.update({ id: uuid.v4() }).then(function(){}, function(err) {
        err.length.should.be.greaterThan(0);
        done();
      });
    });

    it('should return success if valid robot is specified', function(done) {
      repo.create().then(function(robot) {
        repo.update(robot).then(function() {
          done();
        });
      });
    });

    it('should update the robot instance in the repo if valid robot is specified', function(done) {
      repo.create().then(function(robot) {
        // make a copy of the robot to make sure it's being persisted
        var robotToStore = {
          id: robot.id,
          direction: 'East',
          x: 3,
          y: 2
        };

        repo.update(robotToStore).then(function() {

          repo.getById(robot.id).then(function(fetchedRobot) {
            assertRobotHasProperties(fetchedRobot, 3, 2, 'EAST')
            done();
          });

        });
      });
    });

    it('should emit a robotUpdated event when a robot has been updated', function(done) {
      var handler = function(robot) {
        repo.removeListener('robotUpdated', handler);
        assertRobotHasProperties(robot, 1, 2, 'WEST');
        done();
      };
      repo.addListener('robotUpdated', handler);

      repo.create().then(function(robot) {
        robot.x = 1;
        robot.y = 2;
        robot.direction = 'WEST';
        repo.update(robot);
      });

    });

  });

});
