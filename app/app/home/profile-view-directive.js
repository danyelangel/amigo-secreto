/* globals Firebase */
(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name home.directive:profileView
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="home">
       <file name="index.html">
        <profile-view></profile-view>
       </file>
     </example>
   *
   */
  angular
    .module('home')
    .directive('profileView', profileView);

  function profileView() {
    return {
      restrict: 'EA',
      scope: {
        name: '='
      },
      bindToController: true,
      templateUrl: 'home/profile-view-directive.tpl.html',
      controllerAs: 'profileView',
      controller: function ($scope) {
        var vm = this,
            ref = new Firebase('https://amigo-secreto.firebaseio.com');

        $scope.$watch('profileView.name', function () {
          if (angular.isString(vm.name) && vm.name.length > 0) {
            $getWishes(vm.name, function (wishes) {
              vm.wishes = wishes;
            });
          } else {
            vm.wishes = '';
          }
        });

        function $getWishes(name, callback) {
          ref.child(name).child('wishes').on('value', function (snapshot) {
            callback(snapshot.val());
          });
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
