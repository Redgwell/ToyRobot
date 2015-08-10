'use strict';

require('should');
var repo = require('./robots.repo');
var robotConstants = require('./robots.constants');

describe('create', function() {

  it('should return a new robot at position 0,0 facing North when no arguments are specified', function(done) {
    repo.create().then(function(robot) {
      robot.should.have.property('id')
      robot.id.length.should.be.greaterThan(0);
      robot.should.have.property('x', 0);
      robot.should.have.property('y', 0);
      robot.should.have.property('direction', robotConstants.direction.N);
      done();
    });

  });
});
