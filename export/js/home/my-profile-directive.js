/* global Firebase */
(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name home.directive:myProfile
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="home">
       <file name="index.html">
        <my-profile></my-profile>
       </file>
     </example>
   *
   */
  angular
    .module('home')
    .directive('myProfile', myProfile);

  function myProfile() {
    return {
      restrict: 'EA',
      scope: {
        name: '=',
        loggedIn: '='
      },
      bindToController: true,
      templateUrl: 'home/my-profile-directive.tpl.html',
      controllerAs: 'myProfile',
      controller: function ($scope) {
        var vm = this,
            ref = new Firebase('https://amigo-secreto.firebaseio.com');
        vm.save = save;
        vm.cancel = cancel;
        vm.edit = edit;
        vm.onChange = onChange;
        vm.changed = false;
        $scope.$watch('myProfile.loggedIn', function () {
          if (angular.isString(vm.name)) {
            if (vm.name.length > 5) {
              $getWishes(vm.name, function (wishes) {
                vm.savedWishes = wishes;
                vm.wishes = wishes;
              });
            }
          } else {
            vm.savedWishes = '';
            vm.wishes = '';
          }
        });

        function save() {
          $save(vm.name, vm.wishes, function () {
            vm.savedWishes = vm.wishes;
            vm.changed = false;
          });
        }

        function cancel() {
          vm.wishes = vm.savedWishes;
          vm.changed = false;
        }

        function edit() {
          vm.wishes = vm.savedWishes;
          vm.changed = true;
        }

        function $save(name, wishes, callback) {
          ref.child(name).child('wishes').set(wishes, callback);
        }

        function $getWishes(name, callback) {
          ref.child(name).child('wishes').on('value', function (snapshot) {
            callback(snapshot.val());
          });
        }

        function onChange() {
          vm.changed = true;
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());

//# sourceMappingURL=my-profile-directive.js.map
