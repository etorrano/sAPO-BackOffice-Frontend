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
        'ngTouch',
        'ui.tree',
        'ngTable',
        'highcharts-ng'
    ])
    //   .value('fbURL', 'https://angular-ui-tree.firebaseio.com/demo/groups/')
    //   .factory('Groups', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
    //     var API_REST_URL = REST_API.BASE_URL;
    //     console.log("En modelo Catlate");
    //     return $resource(API_REST_URL + ':recurso/:modulo/:submodulo/:id', {}, {
    //       crearCatlate   : { method: 'POST', params: { recurso: 'templates', modulo: 'create'}},
    //       getTemplate     : { method: 'GET', params: { recurso: 'templates' ,id: '@id'},  isArray: false },
    //       getTemplates    : { method: 'GET', params: { recurso: 'templates' },  isArray: true },
    //       actualizarTemplate   : { method: 'PUT', params: { recurso: 'templates',id: '@id'}},
    //       eliminarTemplate   : { method: 'DELETE', params: { recurso: 'templates',id: '@id'}}
    //     })
    //   }])
    //   .controller('groupsCtrl', function($scope, $log, Groups,ServicioTemplate) {
    //
    //     $scope.info = "";
    //     $scope.groups = [];
    //     ServicioTemplate.getTemplates().then(function(templates) {
    //       $scope.groups = templates;
    //     });
    //     $scope.$watch(function () {
    //           return Groups.$getIndex();
    //         },
    //         function() {
    //           $scope.groups = [];/*
    //           var index = Groups.$getIndex();
    //           if (index.length > 0) {
    //             for (var i = 0; i < index.length; i++) {
    //               var group = Groups[index[i]];
    //               if (group) {
    //                 group.id = index[i];
    //                 group.editing = false;
    //                 if (!group.categories) {
    //                   group.categories = [];
    //                 }
    //                 group.$firebase = $firebase(new Firebase(fbURL + group.id)); // jshint ignore:line
    //                 group.destroy = function() {
    //                   this.$firebase.$remove();
    //                 };
    //                 group.save = function() {
    //                   this.$firebase.name = this.name;
    //                   this.$firebase.sortOrder = this.sortOrder;
    //                   this.$firebase.categories = this.categories;
    //                   this.$firebase.$save();
    //                   this.editing = false;
    //                 };
    //                 $scope.groups.push(group);
    //               }
    //             }
    //             $scope.groups.sort(function(group1, group2) {
    //               return group1.sortOrder - group2.sortOrder;
    //             });
    //           }*/
    //         }, true);
    //
    //     $scope.addGroup = function() {
    //       if ($scope.groups.length > 10) {
    //         window.alert('You can\'t add more than 10 groups!');
    //         return;
    //       }
    //       var groupName = document.getElementById("groupName").value;
    //       if (groupName.length > 0) {
    //         Groups.$add({
    //           name: groupName,
    //           type: "group",
    //           categories: [],
    //           sortOrder: $scope.groups.length
    //         });
    //         document.getElementById("groupName").value = '';
    //       }
    //     };
    //
    //     $scope.editGroup = function(group) {
    //       group.editing = true;
    //     };
    //
    //     $scope.cancelEditingGroup = function(group) {
    //       group.editing = false;
    //     };
    //
    //     $scope.saveGroup = function(group) {
    //       group.save();
    //     };
    //
    //     $scope.removeGroup = function(group) {
    //       if (window.confirm('Are you sure to remove this group?')) {
    //         group.destroy();
    //       }
    //     };
    //
    //     $scope.saveGroups = function() {
    //       for (var i = $scope.groups.length - 1; i >= 0; i--) {
    //         var group = $scope.groups[i];
    //         group.sortOrder = i + 1;
    //         group.save();
    //       }
    //     };
    //
    //     $scope.addCategory = function(group) {
    //       if (!group.newCategoryName || group.newCategoryName.length === 0) {
    //         return;
    //       }
    //       group.categories.push({
    //         name: group.newCategoryName,
    //         sortOrder: group.categories.length,
    //         type: "category"
    //       });
    //       group.newCategoryName = '';
    //       group.save();
    //     };
    //
    //     $scope.removeCategory = function(group, category) {
    //       if (window.confirm('Are you sure to remove this category?')) {
    //         var index = group.categories.indexOf(category);
    //         if (index > -1) {
    //           group.categories.splice(index, 1)[0];
    //         }
    //         group.save();
    //       }
    //     };
    //
    //     $scope.options = {
    //       accept: function(sourceNode, destNodes, destIndex) {
    //         var data = sourceNode.$modelValue;
    //         var destType = destNodes.$element.attr('data-type');
    //         return (data.type == destType); // only accept the same type
    //       },
    //       dropped: function(event) {
    //         console.log(event);
    //         var sourceNode = event.source.nodeScope;
    //         var destNodes = event.dest.nodesScope;
    //         // update changes to server
    //         if (destNodes.isParent(sourceNode)
    //             && destNodes.$element.attr('data-type') == 'category') { // If it moves in the same group, then only update group
    //           var group = destNodes.$nodeScope.$modelValue;
    //           group.save();
    //         } else { // save all
    //           $scope.saveGroups();
    //         }
    //       }
    //     };
    //
    //
    //   })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/productos', {
                templateUrl: 'views/productos/producto.html',
                controller: 'CtrlListarProductos',
                controllerAs: 'prod',
                access: { requiredLogin: true }
            })

            .when('/administradores-listar', {
                templateUrl: 'views/administradores/administradores-listar.html',
                controller: 'CtrlListarAdministradores',
                access: { requiredLogin: true }})

            .when('/administradores-actualizar/:id', {
                templateUrl: 'views/administradores/administradores-actualizar.html',
                controller: 'CtrlActAdmin',
                access: { requiredLogin: true }})

            .when('/administradores-crear', {
                templateUrl: 'views/administradores/administradores-crear.html',
                controller: 'CtrlCrearAdmin',
                access: { requiredLogin: true }})

            .when('/productos-listar', {
                templateUrl: 'views/productos/productos-listar.html',
                controller: 'CtrlListarProductos',
                access: { requiredLogin: true }})

            .when('/productos-actualizar/:id', {
                templateUrl: 'views/productos/productos-actualizar.html',
                controller: 'CtrlActAdmin',
                access: { requiredLogin: true }})

            .when('/productos-crear', {
                templateUrl: 'views/productos/productos-crear.html',
                controller: 'CtrlCrearAdmin',
                access: { requiredLogin: true }})

            .when('/templates', {
                templateUrl: 'views/templates/templates-listar.html',
                controller: 'CtrlListarTemplates',
                access: { requiredLogin: true }
            })

            .when('/templates-crear', {
                templateUrl : "views/templates/templates-crear.html",
                controller : "CtrlCrearTemp",
                access: { requiredLogin: true }
            })
            .when('/templates-listar', {
                templateUrl : "views/templates/templates-listar.html",
                controller : "CtrlListarTemplates",
                access: { requiredLogin: true }
            })

            .when('/templates-actualizar/:id', {
                templateUrl: 'views/templates/templates-actualizar.html',
                controller: 'CtrlActTemp',
                access: { requiredLogin: true }})

            /*  .when('/phones/:phoneId', {
             templateUrl: 'views/InfoProd.html',
             controller: 'prodDetCtrl'
             })*/

            .when('/categorias-crear', {
                templateUrl : "views/categorias/categorias-crear.html",
                controller : "CtrlCrearCat",
                access: { requiredLogin: true }
            })
            .when('/categorias-listar', {
                templateUrl : "views/categorias/categorias-listar.html",
                controller : "CtrlListarCategorias",
                access: { requiredLogin: true }
            })

            .when('/categorias-actualizar/:id', {
                templateUrl: 'views/categorias/categorias-actualizar.html',
                controller: 'CtrlActCat',
                access: { requiredLogin: true }
            })

            .when('/notificaciones-cuentas-listar', {
                templateUrl : "views/notificaciones/notificaciones-cuentas-listar.html",
                controller : "CtrlListarNotificaciones",
                access: { requiredLogin: true }
            })

            .when('/reportes/reportes-registrados', {
                templateUrl: '../views/reportes/reportes-registrados.html',
                controller: 'CtrlListarReportesRegistrados',
                access: { requiredLogin: true }
            })

            .when('/reportes/fraude', {
                templateUrl: 'views/reportes/reportes-fraude.html',
                controller: 'CtrlReportesFraude',
                access: { requiredLogin: true }
            })

            .when('/reportes/ganancias', {
                templateUrl: 'views/reportes/reportes-ganancias.html',
                controller: 'CtrlReportesGanancias',
                access: { requiredLogin: true }
            })

            .when('/reportes/prodgenerico', {
                templateUrl: 'views/reportes/reportes-prodgenerico.html',
                controller: 'CtrlReportesProdgenerico',
                access: { requiredLogin: true }
            })


            .when('/demo', {
                templateUrl: 'views/prueba/tree.html',
                controller: 'groupsCtrl',
                access: { requiredLogin: true }})

            .when('/dash', {
                templateUrl: '../views/prueba/index/starterbkp.html'
            })
            /*
             .when('/producto/:nomprod', {
             templateUrl: 'templates/user.html',
             controller: 'UserController'
             })*/

            .when('/edit', {
                templateUrl : "views/prueba/edit.html",
                controller : "editCtrl",
                access: { requiredLogin: true }
            })
            .when('/admin/login', {
                templateUrl: 'views/login.html',
                controller: 'UsuarioAdminCtrl',
                access: { requiredLogin: false }
            })
            .when('/admin/logout', {
                templateUrl: 'views/logout.html',
                controller: 'UsuarioAdminCtrl',
                access: { requiredLogin: true }
            })
            .when('/', {
                templateUrl : "views/principal.html",
                controller: 'inicioCtrl',
                access: { requiredLogin: true }
            })
            .otherwise({
                redirectTo: '/'
            });
    })
/*
 .run(function($rootScope, $location, ServicioAutenticacionAdmin) {
 $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
 console.log("Verificar autorización");
 if (nextRoute.access.requiredLogin && !ServicioAutenticacionAdmin.conectado) {
 console.log("Usuario no conectado");
 $location.path("/admin/login");
 }
 });
 });*/
