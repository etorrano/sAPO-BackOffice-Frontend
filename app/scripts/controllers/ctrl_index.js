'use strict';

/**
 * @ngdoc function
 * @name sApobackOfficeFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sApobackOfficeFrontendApp
 */
angular.module('sApobackOfficeFrontendApp')
  .controller('indexCtrl',['$scope','DatosGlobales', '$q', 'ServicioAdministrador','ServicioUsuarioAdmin', 'ServicioAutenticacionAdmin', 'Admin', '$routeParams',  '$location' ,'$filter',function($scope,DatosGlobales,$q, ServicioAdministrador,ServicioNotificacion, ServicioUsuarioAdmin,ServicioAutenticacionAdmin, Admin, $routeParams, $location,$filter) {

  //  $scope.administrador = Admin;
    $scope.conectado = ServicioAutenticacionAdmin.conectado;
    if ($scope.conectado)
    {
      //$scope.administrador = Admin;
      $scope.u = ServicioAutenticacionAdmin.admin;      
      $scope.DatosGlobales.admin = DatosGlobales.admin;
      $scope.DatosGlobales = DatosGlobales;
    }
        /*console.log("administrador " + $scope.administrador.nombre);
       $scope.$watch(Admin.nombre, function (value) {
console.log("watch " + value);
       if(!value) {
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

     }, true);*/
  /*  (function () {
    $scope.$watch(function () {
    return ServicioUsuarioAdmin.administrador;
    }, function () {
    $scope.students = newVal;

    });
    }());


        ServicioAdministrador.get('leo').then(function(producto) {
            ServicioUsuarioAdmin.set(producto);
            Admin = producto;
            //  $scope.$parent.admnistrador = producto;
            console.log("Guardando prod: " + Admin.nombre);
        });*/
  }]);
