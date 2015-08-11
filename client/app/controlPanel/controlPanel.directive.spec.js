'use strict';

describe('Directive: controlPanel', function () {

  // load the directive's module and view
  beforeEach(module('toyRobotApp'));
  beforeEach(module('app/controlPanel/controlPanel.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<control-panel></control-panel>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the controlPanel directive');
  }));
});