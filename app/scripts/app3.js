(function () {
  'use strict';

  angular.module('demoApp', ['ui.tree', 'ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
      $routeProvider
        .when('/basic-example', {
          controller: 'BasicExampleCtrl',
          templateUrl: '../views/prueba/basic-example.html'
        })
        .when('/cloning', {
          controller: 'CloningCtrl',
          templateUrl: '../views/prueba/cloning.html'
        })
        .when('/connected-trees', {
          controller: 'ConnectedTreesCtrl',
          templateUrl: '../views/prueba/connected-trees.html'
        })
        .when('/filter-nodes', {
          controller: 'FilterNodesCtrl',
          templateUrl: '../views/prueba/filter-nodes.html'
        })
        .when('/nodrop', {
          controller: 'BasicExampleCtrl',
          templateUrl: '../views/prueba/nodrop.html'
        })
        .otherwise({
          redirectTo: '/basic-example'
        });
    }]);
})();
