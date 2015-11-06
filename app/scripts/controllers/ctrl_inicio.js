'use strict';

/**
 * @ngdoc function
 * @name sApobackOfficeFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sApobackOfficeFrontendApp
 */
angular.module('sApobackOfficeFrontendApp')
  .controller('inicioCtrl',['$scope', 'ServicioProducto', '$routeParams', '$location',function($scope, ServicioProducto, $routeParams, $location) {

      ServicioNotificaciones.getLista().then(function(notificaciones) {
        $scope.notificaciones = notificaciones;
      });
  }]);
