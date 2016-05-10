/* global Firebase */
(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name home.directive:loginCard
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="home">
       <file name="index.html">
        <login-card></login-card>
       </file>
     </example>
   *
   */
  angular
    .module('home')
    .directive('loginCard', loginCard);

  function loginCard() {
    return {
      restrict: 'EA',
      scope: {
        name: '=',
        loggedIn: '='
      },
      bindToController: true,
      templateUrl: 'home/login-card-directive.tpl.html',
      controllerAs: 'loginCard',
      controller: function ($firebaseArray, md5) {
        var vm = this,
            ref = new Firebase('https://amigo-secreto.firebaseio.com');

        vm.users = $firebaseArray(ref);

        if (vm.name === null) {
          vm.name = '';
        }
        vm.enabled = true;
        vm.view1 = true;
        vm.nameInput = nameInput;
        vm.cancel = cancel;
        vm.proceed = proceed;
        vm.dismiss = dismiss;
        vm.changePassword = changePassword;
        vm.login = login;
        vm.logout = logout;
        vm.savePassword = savePassword;
        vm.loggedIn = false;

        function nameInput() {
          vm.view1 = false;
          vm.loading = true;
          $isUserRegistered(vm.name, function () {
            vm.loading = false;
            vm.view3 = true;
            vm.password = '';
          }, function () {
            vm.loading = false;
            vm.view2 = true;
          });
        }

        function $isUserRegistered(name, callback1, callback2) {
          ref.child(name).child('isRegistered').once('value', function (snapshot) {
            var isRegistered = snapshot.val();
            if (isRegistered) {
              callback1();
            } else {
              callback2();
            }
          });
        }

        function $registerUser(name, callback) {
          ref.child(name).child('isRegistered').set(true, callback);
        }

        function cancel() {
          vm.view1 = true;
          vm.view2 = false;
          vm.view3 = false;
          vm.wrongPasswordError = false;
        }

        function proceed() {
          var hash;
          vm.loading = true;
          $registerUser(vm.name, function () {
            $suggestedPassword(vm.name, function (pass) {
              vm.suggestedPassword = pass;
              vm.password = pass;
              hash = md5.createHash(pass || '');
              $savePassword(vm.name, hash, function () {
                vm.loading = false;
                vm.view2 = false;
                vm.view5 = false;
                vm.view4 = true;
              });
            });
          });
        }

        function $suggestedPassword(name, callback) {
          ref.child(name).child('suggestedPassword').once('value', function (snapshot) {
            var suggestedPassword = snapshot.val();
            callback(suggestedPassword);
          });
        }

        function changePassword() {
          vm.newPassword = '';
          vm.repeatPassword = '';
          vm.passwordError = false;
          vm.view4 = false;
          vm.view5 = true;
        }

        function login() {
          $login(vm.name, vm.password, function () {
            console.log(vm.name + vm.password);
            dismiss();
            $dismiss();
          });
        }

        function logout() {
          vm.loading = true;
          $logout(function () {
            vm.loading = false;
            vm.dismiss();
            vm.view1 = true;
            vm.enabled = true;
            vm.name = '';
          });
        }

        function dismiss() {
          vm.view1 = false;
          vm.view2 = false;
          vm.view3 = false;
          vm.view4 = false;
          vm.view5 = false;
        }

        function $dismiss() {
          vm.enabled = false;
        }

        function $login(name, password, callback) {
          var hash = md5.createHash(password || '');
          if (name && password) {
            ref.child(name).child('hash').once('value', function (snapshot) {
              if (hash === snapshot.val()) {
                vm.loggedIn = true;
                vm.name = name;
                callback();
              } else {
                wrongPassword();
              }
            });
          }
        }

        function wrongPassword() {
          vm.password = '';
          vm.wrongPasswordError = true;
        }

        function $logout(callback) {
          vm.loggedIn = false;
          callback();
        }

        function savePassword() {
          var newHash;
          console.log(vm.newPassword);
          if (vm.newPassword.length > 5) {
            if (vm.newPassword === vm.repeatPassword) {
              newHash = md5.createHash(vm.newPassword || '');
              vm.password = vm.newPassword;
              vm.loading = true;
              $savePassword(vm.name, newHash,
                function (e) {
                  vm.loading = false;
                  if (!e) {
                    login();
                  } else {
                    vm.passwordNoSaveError = true;
                  }
                }
              );
              vm.passwordMatchError = false;
            } else {
              vm.passwordMatchError = true;
            }
            vm.passwordLengthError = false;
          } else {
            vm.passwordLengthError = true;
          }
          vm.passwordNoSaveError = false;
        }

        function $savePassword(name, hash, callback) {
          ref.child(name).child('hash').set(hash, callback);
        }
      },
      link: function (scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());

//# sourceMappingURL=login-card-directive.js.map
