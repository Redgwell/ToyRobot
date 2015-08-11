'use strict';

describe('Service: interpreter', function () {

  // load the service's module
  beforeEach(module('toyRobotApp'));

  // instantiate service
  var interpreter;
  beforeEach(inject(function (_interpreter_) {
    interpreter = _interpreter_;
  }));

  it('should do something', function () {
    expect(!!interpreter).toBe(true);
  });

});
