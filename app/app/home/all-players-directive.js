/* globals Firebase */
(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name home.directive:allPlayers
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="home">
       <file name="index.html">
        <all-players></all-players>
       </file>
     </example>
   *
   */
  angular
    .module('home')
    .directive('allPlayers', allPlayers);

  function allPlayers() {
    return {
      restrict: 'EA',
      scope: {
        sorting: '=',
        query: '=',
        name: '=',
        santa: '='
      },
      bindToController: true,
      templateUrl: 'home/all-players-directive.tpl.html',
      controllerAs: 'allPlayers',
      controller: function ($firebaseArray) {
        var vm = this,
            ref = new Firebase('https://amigo-secreto.firebaseio.com');

        vm.users = $firebaseArray(ref);
        vm.enable = enable;
        vm.disable = disable;

        function enable() {
          vm.enabled = true;
        }

        function disable() {
          vm.enabled = false;
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
