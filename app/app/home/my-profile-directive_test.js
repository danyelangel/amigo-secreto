/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('myProfile', function () {
  var scope
    , element;

  beforeEach(module('home', 'home/my-profile-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<my-profile></my-profile>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().myProfile.name).toEqual('myProfile');
  });
});
