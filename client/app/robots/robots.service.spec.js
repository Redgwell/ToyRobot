'use strict';

describe('Service: robots', function () {

  // load the service's module
  beforeEach(module('toyRobotApp'));

  // instantiate service
  var robots;
  beforeEach(inject(function (_robots_) {
    robots = _robots_;
  }));

  it('should do something', function () {
    expect(!!robots).toBe(true);
  });

});
