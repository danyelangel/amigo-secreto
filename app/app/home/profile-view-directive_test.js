/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('profileView', function () {
  var scope
    , element;

  beforeEach(module('home', 'home/profile-view-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<profile-view></profile-view>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().profileView.name).toEqual('profileView');
  });
});
