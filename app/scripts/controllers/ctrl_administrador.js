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

.controller('CtrlListarAdministradores', ['$scope', '$q', 'ServicioAdministrador', '$routeParams', '$location','$filter', 'ngTableParams', function($scope, $q, ServicioAdministrador, $routeParams, $location,  $filter, ngTableParams) {
        console.log("En CtrlListarAdministradores");
        $scope.actualizar = function (userId) {
            console.log("Redireccionando a CtrlActAdmin para actualizar administrador con id: " + userId);
            $location.path('/administradores-actualizar/' + userId);

            /*ServicioAdministrador.getLista().then(function(administradores) {
                $scope.administradores = administradores;
            });*/
        };
        /*
        ServicioAdministrador.getLista().then(function(administradores) {
        $scope.administradores = administradores;
         });*/
        ServicioAdministrador.getLista().then(function(administradores)
        {
            /* angular.forEach(results, function(producto) {
             productos = results
             });*/
            $scope.administradores = administradores;
            $scope.tableParams = new ngTableParams(
                {
                    page: 1,          // primera página a mostrar
                    count: 5          // registros por página
                },
                {
                    data: $scope.administradores
                   /* total: results.length, // resultados en total
                    getData: function($defer, params)
                    {
                        $defer.resolve(results.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }*/
                }
            );
        });

        $scope.eliminar = function (administrador) {
            console.log("Borrando administrador con id: " + administrador.username);
            var deferred = $q.defer();
            ServicioAdministrador.eliminar(administrador.username).then(function(res) {
                var index = $scope.administradores.indexOf(administrador);
                $scope.administradores.splice(index, 1);
                $scope.tableParams.reload();
                $location.path('/administradores-listar');
                deferred.resolve(res);
            }, function (error) {
                console.log("Error: " + error);
                deferred.reject(error);
            });
            return deferred.promise;
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
        $scope.actualizar = function (administrador) {
           console.log("En CtrlActAdmin actualizando administrador : " + $scope.administrador.name + $scope.administrador.surname + $scope.administrador.username);
           ServicioAdministrador.actualizar($scope.administrador);
           $location.path('/administradores-listar');
        };
        // ng-click 'cancel':
        $scope.cancelar = function () {
            $location.path('/administradores-listar');
        };


        ServicioAdministrador.get($routeParams.id).then(function(administrador) {
            $scope.administrador = administrador;

        });
    }])

.controller('CtrlCrearAdmin', ['$scope', 'ServicioAdministrador', '$routeParams', '$location',
    function ($scope, ServicioAdministrador, $routeParams, $location) {
        $scope.administrador = null;
        // ng-click 'crear nuevo usuario':
        $scope.crear = function (administrador) {
            //$scope.administrador.id = 101;
            console.log("En CtrlCrearAdmin creando administrador con id: " + $scope.administrador.nombre + $scope.administrador.descripcion);
            ServicioAdministrador.crear($scope.administrador);
            $location.path('/administradores-listar');
        };
    }]);