'use strict';

/**
 * @ngdoc overview
 * @name sApobackOfficeFrontendApp
 * @description
 * # sApobackOfficeFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('sApobackOfficeFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/productos', {
        templateUrl: 'views/productos.html',
        controller: 'CtrlListarProductos',
        controllerAs: 'prod'
      })
        .when('/producto', {
        templateUrl: 'views/producto.html',
        controller: 'CtrlListarProductos'
      })
      /*  .when('/phones/:phoneId', {
        templateUrl: 'views/InfoProd.html',
        controller: 'prodDetCtrl'
      })*/
      .when('/user-detail/:id', {templateUrl: 'partials/user-detail.html', controller: 'CtrlActProd'})
      .when('/user-creation', {templateUrl: 'partials/user-creation.html', controller: 'CtrlCrearProd'})
      .otherwise({
        redirectTo: '/producto'
      });
  });
