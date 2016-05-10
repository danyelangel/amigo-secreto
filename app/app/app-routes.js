(function () {
  'use strict';

  angular
    .module('amigoSecreto')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());
