(function () {
  'use strict';

  angular
    .module('amigoSecreto')
    .config(config);

  function config($urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
  }
}());

//# sourceMappingURL=app-routes.js.map
