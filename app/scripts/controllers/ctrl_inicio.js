'use strict';

/**
 * @ngdoc function
 * @name sApobackOfficeFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sApobackOfficeFrontendApp
 */
angular.module('sApobackOfficeFrontendApp')
  .controller('inicioCtrl',['$scope', 'ServicioReporte', 'ServicioAdministrador','ServicioNotificacion','ServicioUsuarioAdmin', 'ServicioAutenticacionAdmin', 'Admin', '$routeParams',  '$location' ,'$filter', 'NgTableParams',function($scope, ServicioReporte, ServicioAdministrador,ServicioNotificacion, ServicioUsuarioAdmin,ServicioAutenticacionAdmin, Admin, $routeParams, $location,$filter, NgTableParams) {


            ServicioNotificacion.getLista().then(function(notificaciones) {
                $scope.notificaciones = notificaciones;
                $scope.notiftableParams = new NgTableParams(
                    {
                        page: 1,          // primera página a mostrar
                        count:5          // registros por página
                    },
                    {
                        data: $scope.notificaciones
                        /*total: $scope.notificaciones.length, // resultados en total
                        getData: function($defer, params)
                        {
                            $defer.resolve($scope.notificaciones.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                        }*/
                    }
                );
            });
            $scope.notificar = function (notif) {
                console.log("Creando notificacion para: " + notif.usuario);
                var notificacionusuario = {
                    usuarioid: notif.usuario,
                    mensaje:'Su cuenta está próxima a expirar en la fecha:' + $filter('date')(notif.expira, "dd/MM/yyyy"),
                    tipo_notificacion: 1
                };
                var index = $scope.notificaciones.indexOf(notif);
                $scope.notificaciones.splice(index, 1);
                $scope.notiftableParams.reload();
            };

        ServicioReporte.movimientos().then(function(movimientos) {
            $scope.movimientos = movimientos;
           // $scope.tableParams = new NgTableParams({}, { dataset: $scope.movimientos});
            $scope.tableParams = new NgTableParams(
                {
                    page: 1,          // primera página a mostrar
                    count: 5          // registros por página
                },
                {
                    data: $scope.movimientos
                   /* total: $scope.movimientos.length, // resultados en total
                    getData: function($defer, params)
                    {
                        var ordenado;

                        if(params.sorting().date === 'asc'){

                            data.sort(function (a, b) {
                                var dateA = new Date(a.date), dateB = new Date(b.date);
                                return dateA - dateB; //sort by date descending
                            });
                            ordenado = data;

                        } else if(params.sorting().date === 'desc') {

                            data.sort(function (a, b) {
                                var dateA = new Date(a.date), dateB = new Date(b.date);
                                return dateB - dateA; //sort by date descending
                            });
                            ordenado = data;

                        } else if(!params.sorting().date){

                            if (params.filter().term) {
                                ordenado = params.filter() ? $filter('filter')(data, params.filter().term) : data;
                            } else {
                                ordenado = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : data;
                            }

                        }
                       $defer.resolve($scope.movimientos.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }*/
                }
            );
        });
   /* $scope.administrador = Admin;
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

     }, true);
    (function () {
    $scope.$watch(function () {
    return ServicioUsuarioAdmin.administrador;
    }, function () {
    $scope.students = newVal;

    });
    }());
     */

        ServicioAdministrador.get('leo').then(function(producto) {
            ServicioUsuarioAdmin.set(producto);
            Admin = producto;
            //  $scope.$parent.admnistrador = producto;
            console.log("Guardando prod: " + Admin.nombre);
        });
  }]);
