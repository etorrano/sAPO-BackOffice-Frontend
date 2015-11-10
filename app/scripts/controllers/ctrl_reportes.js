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
                    data: $scope.usuarios
                  /*  total: $scope.usuarios.length, // resultados en total
                    getData: function($defer, params)
                    {
                        $defer.resolve($scope.usuarios.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                    }*/
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

    .controller('CtrlReportesFraude', ['$scope', 'highchartsNG', 'ServicioReporte', '$routeParams', '$location','$filter', 'NgTableParams', function($scope, highchartsNG, ServicioReporte, $routeParams, $location,  $filter, NgTableParams) {
        console.log("En CtrlListarReportes");

        ServicioReporte.obtenerRegistrados().then(function(registrados) {
            $scope.usuarios = registrados;
            $scope.tableParams = new NgTableParams(
                {
                    page: 1,          // primera página a mostrar
                    count: 10          // registros por página
                },
                {
                    data: $scope.usuarios
                }
            );
        });
        highchartsNG.ready(function(){
            // init chart config, see lazyload example
            //This is not a highcharts object. It just looks a little like one!
            $scope.chartConfigAreaSpline = {
                options: {
                    chart: {
                        type: 'areaspline'
                    }
                },
                 series: [{
                 data: [10, 15, 12, 8, 7]
                 }],
                 title: {
                 text: 'Hello'
                 },

                 loading: false
                 };
            $scope.chartConfigBoxPlot = {
                options: {
                    chart: {
                        type: 'boxplot'
                    }
                },
                title: {
                    text: 'Highcharts Box Plot Example'
                },

                legend: {
                    enabled: false
                },

                xAxis: {
                    categories: ['1', '2', '3', '4', '5'],
                    title: {
                        text: 'Experiment No.'
                    }
                },

                yAxis: {
                    title: {
                        text: 'Observations'
                    },
                    plotLines: [{
                        value: 932,
                        color: 'red',
                        width: 1,
                        label: {
                            text: 'Theoretical mean: 932',
                            align: 'center',
                            style: {
                                color: 'gray'
                            }
                        }
                    }]
                },

                series: [{
                    type: 'boxplot',
                    name: 'Observations',
                    data: [
                        [760, 801, 848, 895, 965],
                        [733, 853, 939, 980, 1080],
                        [714, 762, 817, 870, 918],
                        [724, 802, 806, 871, 950],
                        [834, 836, 864, 882, 910]
                    ]
                    ,
                    tooltip: {
                        headerFormat: '<em>Experiment No {point.key}</em><br/>'
                    }
                }, {
                    name: 'Anomalías',
                    color: Highcharts.getOptions().colors[0],
                    type: 'scatter',
                    data: [ // x, y positions where 0 is the first category
                        [0, 644],
                        [4, 718],
                        [4, 951],
                        [4, 969]
                    ],
                    marker: {
                        fillColor: 'white',
                        lineWidth: 1,
                        lineColor: Highcharts.getOptions().colors[0]
                    },
                    tooltip: {
                        pointFormat: 'Observation: {point.y}'
                    }
                }]
            }
        },this);

    }])


    .controller('CtrlReportesGanancias', ['$scope','$q', 'highchartsNG', 'ServicioReporte', '$routeParams', '$location','$filter', 'NgTableParams', function($scope, $q, highchartsNG, ServicioReporte, $routeParams, $location,  $filter, NgTableParams) {
        console.log("En CtrlListarReportes");

        var promedios = 0;
        var sumaDatos = 0;
        $scope.proyeccion = 5;
        $scope.crecimiento = [];
        $scope.cantProyecciones = 1;
        ServicioReporte.obtenerRegistrados().then(function(registrados) {
            $scope.usuarios = registrados;
            $scope.tableParams = new NgTableParams(
                {
                    page: 1,          // primera página a mostrar
                    count: 10          // registros por página
                },
                {
                    data: $scope.usuarios
                }
            );
        });
        $scope.datos = [1, 4, 10];
        angular.forEach($scope.datos, function(item, clave) {
            if (clave < $scope.datos.length-1) {
                console.log("clave, tamanio  " +clave +$scope.datos.length );
                console.log("historico  " +item);
                console.log("siguiente  " +$scope.datos[clave + 1]);
                var crecimientoLocal = $scope.datos[clave + 1] / item;
                promedios += crecimientoLocal;
                $scope.crecimiento.push(crecimientoLocal);
                sumaDatos+=item;
                console.log("promedios sumadatos " + promedios + sumaDatos);
            }
            //proyeccion = promedios / $scope.chartConfigAreaSplineHistorico.series.data.length;
            // $scope.checkboxes.items[item.id] = item; // push checked items to array
        });
        sumaDatos+= $scope.datos[$scope.datos.length-1];
        console.log("promedios sumadatos " + promedios + sumaDatos);
        highchartsNG.ready(function(){
            // init chart config, see lazyload example
            //This is not a highcharts object. It just looks a little like one!
            $scope.chartConfigAreaSplineHistorico = {
                options: {
                    chart: {
                        type: 'areaspline'
                    }
                },
                series: [{
                    data: $scope.datos
                }],
                title: {
                    text: 'Hello'
                },

                loading: false
            };
           /* $q.all($scope.chartConfigAreaSplineHistorico.series.data).then(function(){
                angular.forEach($scope.chartConfigAreaSplineHistorico.series.data, function(item, clave) {
                    if (clave < $scope.chartConfigAreaSplineHistorico.series.data.length - 1) {
                        console.log("historico  " +item);
                        promedios += $scope.chartConfigAreaSplineHistorico.series.data[clave + 1] / item;
                        console.log("promedios " + promedios);
                    }
                    //proyeccion = promedios / $scope.chartConfigAreaSplineHistorico.series.data.length;
                    // $scope.checkboxes.items[item.id] = item; // push checked items to array
                });
            });*/


            $scope.chartConfigAreaSplineCrecimiento = {
                options: {
                    chart: {
                        type: 'spline'
                    }
                },
                series: [{
                    data: $scope.crecimiento
                }],
                title: {
                    text: 'Hello'
                },

                loading: false
            };
        },this);
        $scope.proyectar = function () {
            var valor =  $scope.proyeccion;
            //var cantproyecciones = $scope.cantProyecciones;
           // var arreglo = $scope.datos;//$scope.chartConfigAreaSplineHistorico.series.data;
            console.log("proyeccion " + valor);
            var ultimo = $scope.datos[$scope.datos.length-1];
            var tam =$scope.datos.length;
            //$scope.datos.push($scope.proyeccion);
            for (var i = 0; i < $scope.cantProyecciones; i++) {
                sumaDatos+=valor;
                $scope.datos.push(valor);
                promedios += valor/ultimo;
                var crecimiento = promedios/(tam);
                var proyectado = sumaDatos/(tam+1);
                console.log("proyeccion, sumadatos, tamanio " + valor + sumaDatos + tam);
                console.log("proyectado " + proyectado);
                $scope.crecimiento.push(crecimiento);
                console.log("ultimo " + ultimo + "promedios " + promedios + "proyectado " + proyectado + "ultimo elem de arreglo " + $scope.datos[$scope.datos.length-1]);
                angular.extend(ultimo,valor);
                angular.extend(valor,proyectado);
                tam+=1;
            } /*var seriesArray = $scope.chartConfigAreaSplineProyeccion.series;
            var rndIdx = Math.floor(Math.random() * seriesArray.length);
            seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);*/

        };

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