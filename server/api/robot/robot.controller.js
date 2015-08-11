'use strict';

var Q = require('q');
var robotsRepo = require('../../data/robots.repo');

function getRobotWithId(req, res) {
  var deferred = Q.defer();

  robotsRepo.getById(req.params.id).then(function(robot) {
    if (robot) {
      deferred.resolve(robot);
    }
    else {
      res.status(404).send({ error: 'not found' });
      deferred.reject();
    }
  });

  return deferred.promise;
}

// Get list of robots
exports.list = function(req, res) {
  robotsRepo.list().then(function(robots) {
    res.json(robots);
  });
};

exports.getById = function(req, res) {
  getRobotWithId(req, res).then(function(robot) {
    res.json(robot);
  });
};

exports.create = function(req, res) {
  robotsRepo.create(req.body.x, req.body.y, req.body.direction).then(function(robot) {
    res.status(201).json(robot);
  });
};

exports.move = function(req, res) {
  getRobotWithId(req, res).then(function(robot) {
    robot.move();
    robotsRepo.update(robot).then(function() {
      res.json(robot);
    });
  });
};

exports.rotate = function(req, res) {
  var direction = (req.body.direction || '').toLowerCase();
  if (direction !== 'left' && direction !== 'right') {
    res.status(400).json({ error: 'Invalid direction. You must specify \'left\' or \'right\'. '});
  }
  getRobotWithId(req, res).then(function(robot) {
    if (direction === 'left') {
      robot.rotateLeft();
    }
    else {
      robot.rotateRight();
    }

    robotsRepo.update(robot).then(function() {
      res.json(robot);
    });
  });
};

exports.getReport = function(req, res) {
  getRobotWithId(req, res).then(function(robot) {
    res.json({ report: robot.getPositionReport() });
  });
};
