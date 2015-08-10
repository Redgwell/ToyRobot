'use strict';

require('should');
var robotModel = require('./robot.model');

describe('init', function() {
  it('creates the model with valid default values', function() {
    var model = new robotModel();
    model.should.have.property('id');
    model.id.length.should.be.greaterThan(0);

    model.should.have.property('x', 0);
    model.should.have.property('y', 0);
    model.should.have.property('direction', 'North');
  });
});

describe('setDirection', function() {
  it('sets direction when valid values are specified', function() {
    var model = new robotModel();
    model.setDirection('North');
    model.direction.should.equal('North');

    model.setDirection('South');
    model.direction.should.equal('South');

    model.setDirection('East');
    model.direction.should.equal('East');

    model.setDirection('West');
    model.direction.should.equal('West');
  });

  it('does not change direction for undefined values', function() {
    var model = new robotModel();
    model.setDirection('East'); // set a valid non-north value initially

    model.setDirection();
    model.direction.should.equal('East');

    model.setDirection(0);
    model.direction.should.equal('East');

    model.setDirection('124fqwf3');
    model.direction.should.equal('East');
  });
});
