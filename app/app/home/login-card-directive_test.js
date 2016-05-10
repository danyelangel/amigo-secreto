/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('loginCard', function () {
  var scope
    , element;

  beforeEach(module('home', 'home/login-card-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<login-card></login-card>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().loginCard.name).toEqual('loginCard');
  });
});
