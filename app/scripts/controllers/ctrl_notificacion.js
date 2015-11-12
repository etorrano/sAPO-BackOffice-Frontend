/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
.controller('CtrlListarNotificacion', ['$scope', 'ServicioNotificacion', '$routeParams', '$location',function($scope, ServicioNotificacion, $routeParams, $location) {
    console.log("En CtrlListarNotificaciones");
    ServicioNotificacion.get({id: $routeParams.id}).then(function(notificacion) {
        $scope.notificacion = notificacion;

    });

}])

.controller('CtrlListarNotificaciones', ['$scope', '$q', 'ServicioNotificacion', '$routeParams', '$location','$filter', 'ngTableParams', function($scope, $q, ServicioNotificacion, $routeParams, $location,  $filter, ngTableParams) {
        console.log("En CtrlListarNotificaciones");
        var fecha = new Date();
        //fecha.setMonth(fecha.getMonth()+1);
        fecha.setFullYear(fecha.getFullYear()+1);
        // fecha: fecha.getTime()
        ServicioNotificacion.getLista().then(function(notificaciones) {
            $scope.notificaciones = notificaciones;
            $scope.tableParams = new ngTableParams(
                {
                    page: 1,          // primera página a mostrar
                    count: 2          // registros por página
                },
                {
                    dataset: $scope.notificaciones,
                    total: $scope.notificaciones.length, // resultados en total
                    getData: function($defer, params)
                    {
                        $defer.resolve($scope.notificaciones.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                }
            );
         });
      //  ServicioNotificacion.getLista().then(function(results)
       // {
            /* angular.forEach(results, function(producto) {
             productos = results;
             });*/

     //   });
     /*
        this.eliminar = function(category) {
            smartConfirm.create('Delete Category','Warning: This action cannot be undone', 'times', function() {
                if (category) {
                    for (var i in $scope.categories) {
                        if ($scope.categories[i]._id === category._id) {
                            $scope.categories.splice(i, 1);
                        }
                    }
                    category.$remove();

                    if ($state.current.name.search('categories.all categories') === 0) {
                        $scope.tableParams.reload();
                    }else{
                        $state.go('categories.all categories');
                    }
                } else {
                    $scope.category.$remove(function(response) {
                        $state.go('categories.all categories');
                    });
                }
            });
        };
        */
        /*
        var resetTableParams = function(){
            return {
                total: $scope.notificaciones.length,
                getData: function($defer, params) {
                    var filteredData = params.filter() ? $filter('filter')(data,    params.filter()) : $scope.notificaciones;
                    var orderedData = params.sorting() ? $filter('orderBy')(data, params.orderBy()) : filteredData;

                    params.total(orderedData.length);
                    $defer.resolve($scope.data = orderedData.slice((params.page() -1) * params.count(), params.page() * params.count()));
                }
            }
        }*/
        $scope.notificar = function (notif) {
            console.log("Creando notificacion para: " + notif.usuario);
            var notificacionusuario = {
                usuarioid: notif.usuario,
                mensaje:'Su cuenta está próxima a expirar en la fecha:' + $filter('date')(notif.expira, "dd/MM/yyyy"),
                tipo_notificacion: 1
            };
            var deferred = $q.defer();
            ServicioNotificacion.notificar(notificacionusuario).then(function(notificaciones) {
                var index = $scope.notificaciones.indexOf(notif);
                $scope.notificaciones.splice(index, 1);
                $scope.tableParams.reload();
                deferred.resolve(notificaciones);
            }, function (error) {
                console.log("Error: " + error);
                deferred.reject(error);
            });
            return deferred.promise;

            /*  $scope.tableParams = new ngTableParams(
             {
             page: 1,          // primera página a mostrar
             count: 2          // registros por página
             },
             {
             dataset: $scope.notificaciones,
             total: $scope.notificaciones.length, // resultados en total
             getData: function($defer, params)
             {
             $defer.resolve($scope.notificaciones.slice((params.page() - 1) * params.count(), params.page() * params.count()));
             }
             }
             );*/
            //notif.$remove();
           // $location.path('/notificaciones-cuentas-listar');
        };
       // +  $filter('date')($scope.notificacion.expira, "dd/MM/yyyy")
}]);
/*
.controller('CtrlActAdmin', ['$scope', 'ServicioNotificacion', function($scope, ServicioNotificacion) {
    ServicioNotificacion.actualizar($scope.notificacion.id);
    console.log("En CtrlActAdmin actualizando notificacion con id: " + $scope.notificacion.id);

}])

.controller('CtrlActAdmin', ['$scope', 'ServicioNotificacion', '$routeParams', '$location',function($scope, ServicioNotificacion, $routeParams, $location) {
        console.log("En CtrlActAdmin con id: " + $routeParams.id);
        // callback for ng-click 'updateUser':
        $scope.actualizar = function (notificaciones) {
           console.log("En CtrlActAdmin actualizando notificacion con id: " + $scope.notificaciones.id + $scope.notificaciones.nombre + $scope.notificaciones.descripcion);
           ServicioNotificacion.actualizar($scope.notificaciones);
           $location.path('/notificaciones-cuentas-listar');
        };
        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/notificaciones-cuentas-listar');
        };


        ServicioNotificacion.get({id: $routeParams.id}).then(function(notificaciones) {
            $scope.notificaciones = notificaciones;

        });
    }])

.controller('CtrlCrearAdmin', ['$scope', 'ServicioNotificacion', '$routeParams', '$location',
    function ($scope, ServicioNotificacion, $routeParams, $location) {
        // ng-click 'crear nuevo usuario':
        $scope.crear = function (notificaciones) {
            //$scope.notificaciones.id = 101;
            console.log("En CtrlCrearAdmin creando notificacion con id: " + $scope.notificaciones.nombre + $scope.notificaciones.descripcion);
            ServicioNotificacion.crear($scope.notificaciones);
            $location.path('/notificaciones-cuentas-listar');
        };
    }]);*/