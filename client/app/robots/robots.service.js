'use strict';

angular.module('toyRobotApp').service('robotsService', function ($http) {
  this.getRobots = function() {
    return $http.get('/api/robots');
  };

  this.getRobotById = function(id) {
    return $http.get('/api/robots/' + id);
  };

  this.createRobot = function(x, y, direction) {
    return $http.post('/api/robots', { x: x, y: y, direction: direction});
  };

  this.moveRobot = function(id) {
    return $http.put('/api/robots/' + id + '/move');
  };

  this.rotateRobot = function(id, direction) {
    return $http.put('/api/robots/' + id + '/rotate', { direction: direction });
  };

  this.getRobotReport = function(id) {
    return $http.get('/api/robots/' + id + '/report');
  };
});
