/* global describe, beforeEach, it, expect, inject, module */
'use strict';

describe('mySecretSanta', function () {
  var scope
    , element;

  beforeEach(module('home', 'home/my-secret-santa-directive.tpl.html'));

  beforeEach(inject(function ($compile, $rootScope) {
    scope = $rootScope.$new();
    element = $compile(angular.element('<my-secret-santa></my-secret-santa>'))(scope);
  }));

  it('should have correct text', function () {
    scope.$apply();
    expect(element.isolateScope().mySecretSanta.name).toEqual('mySecretSanta');
  });
});
