/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')

.controller('CtrlListarAdministrador', ['$scope', 'ServicioAdministrador', '$routeParams', '$location',function($scope, ServicioAdministrador, $routeParams, $location) {
    console.log("En CtrlListarAdministradores");
    ServicioAdministrador.get({id: $routeParams.id}).then(function(administrador) {
        $scope.administrador = administrador;

    });

}])

.controller('CtrlListarAdministradores', ['$scope', 'ServicioAdministrador', '$routeParams', '$location','$filter', 'ngTableParams', function($scope, ServicioAdministrador, $routeParams, $location,  $filter, ngTableParams) {
        console.log("En CtrlListarAdministradores");
        $scope.actualizar = function (userId) {
            console.log("Redireccionando a CtrlActAdmin para actualizar administrador con id: " + userId);
            $location.path('/administradores-actualizar/' + userId);

            ServicioAdministrador.getLista().then(function(administradores) {
                $scope.administradores = administradores;
            });
        };
        /*
        ServicioAdministrador.getLista().then(function(administradores) {
        $scope.administradores = administradores;
         });*/
        ServicioAdministrador.getLista().then(function(results)
        {
            /* angular.forEach(results, function(producto) {
             productos = results;
             });*/
            $scope.tableParams = new ngTableParams(
                {
                    page: 1,          // primera página a mostrar
                    count: 5          // registros por página
                },
                {
                    total: results.length, // resultados en total
                    getData: function($defer, params)
                    {
                        $defer.resolve(results.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                }
            );
        });

        $scope.eliminar = function (userId) {
            console.log("Borrando administrador con id: " + userId);
            ServicioAdministrador.eliminar(userId);
            $location.path('/administradores-listar');
        };

}])
/*
.controller('CtrlActAdmin', ['$scope', 'ServicioAdministrador', function($scope, ServicioAdministrador) {
    ServicioAdministrador.actualizar($scope.administrador.id);
    console.log("En CtrlActAdmin actualizando administrador con id: " + $scope.administrador.id);

}])
*/
.controller('CtrlActAdmin', ['$scope', 'ServicioAdministrador', '$routeParams', '$location',function($scope, ServicioAdministrador, $routeParams, $location) {
        console.log("En CtrlActAdmin con id: " + $routeParams.id);
        // callback for ng-click 'updateUser':
        $scope.actualizar = function (administradores) {
           console.log("En CtrlActAdmin actualizando administrador con id: " + $scope.administradores.id + $scope.administradores.nombre + $scope.administradores.descripcion);
           ServicioAdministrador.actualizar($scope.administradores);
           $location.path('/administradores-listar');
        };
        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/administradores-listar');
        };


        ServicioAdministrador.get({id: $routeParams.id}).then(function(administradores) {
            $scope.administradores = administradores;

        });
    }])

.controller('CtrlCrearAdmin', ['$scope', 'ServicioAdministrador', '$routeParams', '$location',
    function ($scope, ServicioAdministrador, $routeParams, $location) {
        // ng-click 'crear nuevo usuario':
        $scope.crear = function (administradores) {
            //$scope.administradores.id = 101;
            console.log("En CtrlCrearAdmin creando administrador con id: " + $scope.administradores.nombre + $scope.administradores.descripcion);
            ServicioAdministrador.crear($scope.administradores);
            $location.path('/administradores-listar');
        };
    }]);