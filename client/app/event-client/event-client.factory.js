/* global SockJS */
'use strict';

angular.module('toyRobotApp').factory('EventClient', function () {

  var self = this;

  var sockjs = new SockJS('/api/robots/events');

  sockjs.onmessage = function(e) {
    var data = JSON.parse(e.data);
    switch (data.action) {
      case 'created':
        if (self.onCreate) {
          self.onCreate(data.robot);
        }
        break;
      case 'updated':
        if (self.onUpdate) {
          self.onUpdate(data.robot);
        }
        break;
    }
  };

  var eventClient = function(onCreate, onUpdate) {
    self.onCreate = onCreate;
    self.onUpdate = onUpdate;
  };

  return eventClient;
});
