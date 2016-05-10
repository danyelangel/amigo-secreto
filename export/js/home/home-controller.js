/* globals Firebase, location */
(function () {
  'use strict';

  /**
   * @ngdoc object
   * @name home.controller:HomeCtrl
   *
   * @description
   *
   */
  angular
    .module('home')
    .controller('HomeCtrl', HomeCtrl);

  function HomeCtrl($mdDialog) {
    var vm = this,
        ref = new Firebase('https://amigo-secreto.firebaseio.com');

    vm.deleteAccount = function () {
      var alert = $mdDialog
          .confirm()
          .title('Confirmar')
          .content('¿Estás seguro(a) que quieres borrar esta cuenta?')
          .ok('Continuar')
          .cancel('Cancelar'),
          a, b, c;

      $mdDialog.show(alert).finally(function () {
        ref.child(vm.name).child('hash').set(null, function () {
          a = true;
          reload();
        });
        ref.child(vm.name).child('isRegistered').set(false, function () {
          b = true;
          reload();
        });
        ref.child(vm.name).child('wishes').set('', function () {
          c = true;
          reload();
        });
      });

      function reload() {
        if (a === true && b === true && c === true) {
          location.reload(true);
        }
      }
    };
  }
}());

//# sourceMappingURL=home-controller.js.map
