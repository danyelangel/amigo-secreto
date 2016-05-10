/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('allPlayers', function () {
  var scope
    , element;

  beforeEach(module('home', 'home/all-players-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<all-players></all-players>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().allPlayers.name).toEqual('allPlayers');
  });
});
