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
        templateUrl: 'views/producto.html',
        controller: 'CtrlListarProductos',
        controllerAs: 'prod'
      })
        .when('/producto/:id', {
        templateUrl: 'views/producto.html',
        controller: 'CtrlListarProducto'
      })
      /*  .when('/phones/:phoneId', {
        templateUrl: 'views/InfoProd.html',
        controller: 'prodDetCtrl'
      })*/
      .when('/productos', {templateUrl: 'views/user-list.html', controller: 'CtrlListarProductos'})

      .when('/user-detail/:id', {templateUrl: 'views/user-detail.html', controller: 'CtrlActProd'})
      .when('/user-creation', {templateUrl: 'views/user-creation.html', controller: 'CtrlCrearProd'})
/*
      .when('/producto/:nomprod', {
        templateUrl: 'templates/user.html',
        controller: 'UserController'
      })*/
      .otherwise({
        redirectTo: '/productos'
      });
  });
