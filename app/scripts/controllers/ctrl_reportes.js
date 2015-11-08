/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')

.controller('CtrlListarReporte', ['$scope', 'ServicioReporte', '$routeParams', '$location',function($scope, ServicioReporte, $routeParams, $location) {
    console.log("En CtrlListarReportes");
    ServicioReporte.get({id: $routeParams.id}).then(function(reporte) {
        $scope.reporte = reporte;

    });

}])

.controller('CtrlListarReportesRegistrados', ['$scope', 'ServicioReporte', '$routeParams', '$location','$filter', 'ngTableParams', function($scope, ServicioReporte, $routeParams, $location,  $filter, ngTableParams) {
        console.log("En CtrlListarReportes");
        
        ServicioReporte.obtenerRegistrados().then(function(registrados) {
            $scope.usuarios = registrados;
            $scope.tableParams = new ngTableParams(
                {
                    page: 1,          // primera página a mostrar
                    count: 10          // registros por página
                },
                {
                    dataset: $scope.usuarios,
                    total: $scope.usuarios.length, // resultados en total
                    getData: function($defer, params)
                    {
                        $defer.resolve($scope.usuarios.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }
                }
            );
        });
        $scope.notificar = function (notif) {
            console.log("Creando reporte para: " + notif.usuario);
            var reporteusuario = {
                usuarioid: notif.usuario,
                mensaje:'Su cuenta está próxima a expirar en la fecha:' + $filter('date')(notif.expira, "dd/MM/yyyy"),
                tipo_reporte: 1
            };
            //ServicioReporte.notificar(reporteusuario);

            var index = $scope.reportes.indexOf(notif);
            $scope.reportes.splice(index, 1);
            /*  $scope.tableParams = new ngTableParams(
             {
             page: 1,          // primera página a mostrar
             count: 2          // registros por página
             },
             {
             dataset: $scope.reportes,
             total: $scope.reportes.length, // resultados en total
             getData: function($defer, params)
             {
             $defer.resolve($scope.reportes.slice((params.page() - 1) * params.count(), params.page() * params.count()));
             }
             }
             );*/
            $scope.tableParams.reload();
            //notif.$remove();
            // $location.path('/reportes-cuentas-listar');
        };
        // +  $filter('date')($scope.reporte.expira, "dd/MM/yyyy")

}])
/*
.controller('CtrlActAdmin', ['$scope', 'ServicioReporte', function($scope, ServicioReporte) {
    ServicioReporte.actualizar($scope.reporte.id);
    console.log("En CtrlActAdmin actualizando reporte con id: " + $scope.reporte.id);

}])
*/
.controller('CtrlActAdmin', ['$scope', 'ServicioReporte', '$routeParams', '$location',function($scope, ServicioReporte, $routeParams, $location) {
        console.log("En CtrlActAdmin con id: " + $routeParams.id);
        // callback for ng-click 'updateUser':
        $scope.actualizar = function (reportes) {
           console.log("En CtrlActAdmin actualizando reporte con id: " + $scope.reportes.id + $scope.reportes.nombre + $scope.reportes.descripcion);
           ServicioReporte.actualizar($scope.reportes);
           $location.path('/reportes-listar');
        };
        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/reportes-listar');
        };


        ServicioReporte.get({id: $routeParams.id}).then(function(reportes) {
            $scope.reportes = reportes;

        });
    }])

.controller('CtrlCrearAdmin', ['$scope', 'ServicioReporte', '$routeParams', '$location',
    function ($scope, ServicioReporte, $routeParams, $location) {
        // ng-click 'crear nuevo usuario':
        $scope.crear = function (reportes) {
            //$scope.reportes.id = 101;
            console.log("En CtrlCrearAdmin creando reporte con id: " + $scope.reportes.nombre + $scope.reportes.descripcion);
            ServicioReporte.crear($scope.reportes);
            $location.path('/reportes-listar');
        };
    }]);