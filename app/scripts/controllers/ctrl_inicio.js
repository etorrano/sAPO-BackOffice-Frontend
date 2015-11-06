'use strict';

/**
 * @ngdoc function
 * @name sApobackOfficeFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sApobackOfficeFrontendApp
 */
angular.module('sApobackOfficeFrontendApp')
  .controller('inicioCtrl',['$scope', 'ServicioNotificacion','ServicioUsuarioAdmin', '$routeParams', 'ServicioAutenticacionAdmin', '$location',function($scope, ServicioNotificacion, ServicioUsuarioAdmin,ServicioAutenticacionAdmin, $routeParams, $location) {
    $scope.$watch(ServicioAutenticacionAdmin.conectado, function (value, oldValue) {
console.log("watch " + value + oldValue);
       if(!value && oldValue) {
         console.log("Disconnect");
         $location.path('/login');
       }

       if(value) {
         console.log("Connect");

          ServicioNotificacion.getLista().then(function(notificaciones) {
            $scope.notificaciones = notificaciones;
          });

        $scope.administrador = ServicioUsuarioAdmin.get();
        console.log("Admin " + $scope.administrador.nombre);
         //Do something when the user is connected
       }


       $scope.administrador = ServicioUsuarioAdmin.get();
       console.log("Admin " + $scope.administrador.nombre);
     }, true);
      /*(function () {
            $scope.$watch(function () {
                return ServicioUsuarioAdmin.administrador;
            }, function () {
                    $scope.students = newVal;

            });
        }());*/
  }]);
