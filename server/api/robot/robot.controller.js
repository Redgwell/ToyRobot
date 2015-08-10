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
//  res.json([]);
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
    res.json(robot);
  });
  // TODO - get the robot, move it, save it, then return
};

// router.post('/', controller.create);
// router.get('/:id', controller.getById);
// router.put('/:id/move', controller.move);
// router.get('/:id/report', controller.getReport);
// router.put('/:id/rotate', controller.rotate);


// var _ = require('lodash');
// var uuid = require('uuid');
// var Q = require('q');

// module.exports = {
//   place: function(x, y, direction) {
//     // var robot = {
//     //   id: uuid.v1(),
//     //   x: rectifyPosition(x, robotConstants.limits.min.x, robotConstants.limits.max.x),
//     //   y: rectifyPosition(y, robotConstants.limits.min.y, robotConstants.limits.max.y),
//     //   direction: robotConstants.direction.parse(direction) || robotConstants.direction.N
//     // }
//     // robotsCollection.push(robot);

//     // return Q.resolve(robot);
//   },
//   move: function() {
//     //return Q.resolve(robotsCollection);
//   },
//   left: function(id) {
//     //return Q.resolve(_.find(robotsCollection, {id: id}));
//   },
//   right: function(id) {
//     //return Q.resolve(_.find(robotsCollection, {id: id}));
//   },
//   report: function(robot) {
//   }
// };
