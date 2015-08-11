'use strict';

var sockjs = require('sockjs');
var robotsRepo = require('../../data/robots.repo');

module.exports = function(httpServer) {
  var sockJsOptions = {};
  var socketServer = sockjs.createServer(sockJsOptions);
  socketServer.on('connection', function(conn) {
    console.log('connected ' + conn.id);

    var onRobotCreated = function(robot) {
      conn.write(JSON.stringify({ action: 'created', robot: robot }));
    }

    var onRobotUpdated = function(robot) {
      conn.write(JSON.stringify({ action: 'updated', robot: robot }));
    }

    robotsRepo.addListener('robotCreated', onRobotCreated);
    robotsRepo.addListener('robotUpdated', onRobotUpdated);

    conn.on('close', function() {
      robotsRepo.removeListener('robotCreated', onRobotCreated);
      robotsRepo.removeListener('robotUpdated', onRobotUpdated);
      console.log('closed ' + conn.id);
    });

  });
  socketServer.installHandlers(httpServer, { prefix:'/api/robots/events' });
};
