/* globals Firebase */
(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name home.directive:mySecretSanta
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="home">
       <file name="index.html">
        <my-secret-santa></my-secret-santa>
       </file>
     </example>
   *
   */
  angular
    .module('home')
    .directive('mySecretSanta', mySecretSanta);

  function mySecretSanta() {
    return {
      restrict: 'EA',
      scope: {
        userName: '=',
        loggedIn: '='
      },
      bindToController: true,
      templateUrl: 'home/my-secret-santa-directive.tpl.html',
      controllerAs: 'mySecretSanta',
      controller: function ($scope) {
        var vm = this,
            ref = new Firebase('https://amigo-secreto.firebaseio.com');

        $scope.$watch('mySecretSanta.loggedIn', function () {
          if (angular.isString(vm.userName) && vm.userName.length > 5) {
            $getSecretSanta(vm.userName, function (santa) {
              vm.name = santa;
            });
          } else {
            vm.savedWishes = '';
            vm.wishes = '';
          }
        });

        function $getSecretSanta(userName, callback) {
          var name;
          ref.child(userName).child('santa').once('value', function (snapshot) {
            name = snapshot.val();

            if (angular.isString(name) && name !== '' && name !== userName) {
              callback(name);
            }
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

//# sourceMappingURL=my-secret-santa-directive.js.map
