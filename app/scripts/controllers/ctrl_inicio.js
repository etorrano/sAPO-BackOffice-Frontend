'use strict';

/**
 * @ngdoc function
 * @name sApobackOfficeFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sApobackOfficeFrontendApp
 */
angular.module('sApobackOfficeFrontendApp')
  .controller('inicioCtrl',['$scope', 'ServicioNotificacion','ServicioUsuarioAdmin', 'ServicioAutenticacionAdmin', 'Admin', '$routeParams',  '$location',function($scope, ServicioNotificacion, ServicioUsuarioAdmin,ServicioAutenticacionAdmin, Admin, $routeParams, $location) {
        ServicioNotificacion.getLista().then(function(notificaciones) {
            $scope.notificaciones = notificaciones;
        });
    $scope.administrador = Admin;
       $scope.$watch(Admin, function (value, oldValue) {
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

         //Do something when the user is connected


           $scope.administrador = Admin;// ServicioUsuarioAdmin.get();
           console.log("Admin " + $scope.administrador.nombre);
       }

     }, true);
      /*(function () {
            $scope.$watch(function () {
                return ServicioUsuarioAdmin.administrador;
            }, function () {
                    $scope.students = newVal;

            });
        }());*/
  }]);
