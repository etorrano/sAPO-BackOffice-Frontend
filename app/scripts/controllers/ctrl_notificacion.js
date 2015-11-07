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

.controller('CtrlListarNotificaciones', ['$scope', 'ServicioNotificacion', '$routeParams', '$location','$filter', 'ngTableParams', function($scope, ServicioNotificacion, $routeParams, $location,  $filter, ngTableParams) {
        console.log("En CtrlListarNotificaciones");
        /*
        ServicioNotificacion.getLista().then(function(notificaciones) {
        $scope.notificaciones = notificaciones;
         });*/
        ServicioNotificacion.getLista().then(function(results)
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

        $scope.notificar = function (usuario) {
            console.log("Creando notificacion para: " + usuario);
            var notificacion = {
                usuarioid: usuario,
                mensaje:'Su cuenta está próxima a expirar en la fecha:',
                tipo_notificacion: 1
            };
            ServicioNotificacion.notificar(notificacion);
            $location.path('/notificaciones-cuentas-listar');
        };
       // +  $filter('date')($scope.notificacion.expira, "dd/MM/yyyy")
}])
/*
.controller('CtrlActAdmin', ['$scope', 'ServicioNotificacion', function($scope, ServicioNotificacion) {
    ServicioNotificacion.actualizar($scope.notificacion.id);
    console.log("En CtrlActAdmin actualizando notificacion con id: " + $scope.notificacion.id);

}])
*/
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
    }]);