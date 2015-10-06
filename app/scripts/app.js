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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
        .when('/phones', {
        templateUrl: 'views/productos.html',
        controller: 'prodCtrl'
      })
        .when('/phones/:phoneId', {
        templateUrl: 'views/InfoProd.html',
        controller: 'prodDetCtrl'
      })
      .otherwise({
        redirectTo: '/phones'
      });
  });
