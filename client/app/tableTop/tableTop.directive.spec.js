'use strict';

describe('Directive: tableTop', function () {

  // load the directive's module and view
  beforeEach(module('toyRobotApp'));
  beforeEach(module('app/tableTop/tableTop.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<table-top></table-top>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the tableTop directive');
  }));
});