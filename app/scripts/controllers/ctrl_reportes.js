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

    .controller('CtrlReportesFraude', ['$scope','$q', 'highchartsNG', 'ServicioReporte', '$routeParams', '$location','$filter', 'NgTableParams', function($scope, $q, highchartsNG, ServicioReporte, $routeParams, $location,  $filter, NgTableParams) {
        console.log("En CtrlListarReportes");
        var dias = 30;
        var cantAlmacenes = 5;
        var indiceDias = [];
        /*console.log("IndicesCantAlmacenes");
        for (var i=0; i<cantAlmacenes; i++) {
            indiceDias.push('farmacia');
        }*/
        ServicioReporte.obtenerReporteMovimientos(dias).then(function(reportes) {
            console.log("Filtro reportes a cant: " + cantAlmacenes);
            //$scope.reportes = $filter('limitTo')(reportes.lista, cantAlmacenes, 0);
            $scope.reportes =             [
                { x: 'farmacia', low: 718, q1: 836, median: 864, q3: 882, high: 952}
              ];
            $scope.anomalias = [];
            console.log("Obtengo anomalías");
            angular.forEach($scope.reportes, function(item, clave) {
                var IRC = item.q3 - item.q1;
                console.log("IRC "+ IRC);
                limiteSuperior = item.q3+IRC*1.5;
                limiteInferior = item.q1-IRC*1.5;
                console.log("limsup, liminf: "+ limiteSuperior,limiteInferior);
                if(item.high>limiteSuperior)
                {
                    console.log("anomaliasup "+ item.high);
                    $scope.anomalias.push([clave,item.high]);
                    item.high = limiteSuperior;
                }
                if(item.low<limiteInferior)
                {
                    console.log("anomaliainf "+ item.low);
                    $scope.anomalias.push([clave,item.low]);
                    item.low = limiteInferior;
                }
                indiceDias.push(item.x);
                item.x = indiceDias.indexOf(item.x);
                console.log("indice x "+ item.x);
            });
            $q.all($scope.reportes).then(function(){
                console.log("Creo boxplot");
                highchartsNG.ready(function(){
                    $scope.chartConfigBoxPlot = {
                        options: {
                            chart: {
                                type: 'boxplot'
                            }
                        },
                        title: {
                            text: 'Análisis de anomalías'
                        },

                        legend: {
                            enabled: false
                        },

                        xAxis: {
                            categories: indiceDias,
                            title: {
                                text: 'Almacen '
                            }
                        },

                        yAxis: {
                            title: {
                                text: 'Movimientos'
                            },
                            plotLines: [{
                                value: reportes.mean,
                                color: 'red',
                                width: 1,
                                label: {
                                    text: 'Media de los movimientos: ' + reportes.mean,
                                    align: 'center',
                                    style: {
                                        color: 'gray'
                                    }
                                }
                            }]
                        },

                        series: [{
                            type: 'boxplot',
                            name: 'Observaciones',
                            data: $scope.reportes,
                            tooltip: {
                                headerFormat: '<em>Almacen: </em><br/>'
                            }
                        }, {
                            name: 'Anomalías',
                            color: Highcharts.getOptions().colors[0],
                            type: 'scatter',
                            data: $scope.anomalias,
                            marker: {
                                fillColor: 'white',
                                lineWidth: 1,
                                lineColor: Highcharts.getOptions().colors[0]
                            },
                            tooltip: {
                                pointFormat: 'Observación: {point.y}'
                            }
                        }]
                    }
                },this);
            });
        });
    }])


    .controller('CtrlReportesGanancias', ['$scope','$q', 'highchartsNG', 'ServicioReporte', '$routeParams', '$location','$filter', 'NgTableParams', function($scope, $q, highchartsNG, ServicioReporte, $routeParams, $location,  $filter, NgTableParams) {
        console.log("En CtrlListarReportes");
      //$scope.anios = [2010,2011,2012,2013,2014,2015];
        $scope.anios = [2010,2011,2012,2013,2014,2015];
        $scope.datos = [1, 4, 10];
        var promedios = 0;
        var sumaDatos = 0;
        //$scope.proyeccion = 5;
        $scope.crecimiento = [];
        $scope.cantProyecciones = 1;
      /*  ServicioReporte.obtenerRegistrados().then(function(registrados) {
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
        });*/
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
                    name: 'Ganancia por año',
                    data: $scope.datos
                }],/*
                title: {
                    text: 'Ganancias anuales'
                },*/
                title: {
                    text: 'Ganancias anuales'
                },
                yAxis: {
                    title: {
                        text: 'Ganancias'
                    }
                },
                xAxis: {
                    title: {
                        text: 'Años'
                    },
                    categories: $scope.anios
                  //  type: 'datetime'
                /*  min: 2000,
                  max: 2010*/
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
                    name: 'Crecimiento por año',
                    data: $scope.crecimiento
                }],
                title: {
                    text: 'Crecimiento anual'
                },
                yAxis: {
                    title: {
                        text: 'Crecimiento'
                    }
                },
                xAxis: {
                    title: {
                        text: 'Años'
                    },
                    categories: $scope.anios
                  //  type: 'datetime'
                /*  min: 2000,
                  max: 2010*/
                },

                loading: false
            };
        },this);
        var proyeccion = 0;
        var alternado = 0;
        $scope.proyectar = function () {
            var valor =  $scope.proyeccion;
            var crecimiento = 0;
            var proyectado = 0;
            //var cantproyecciones = $scope.cantProyecciones;
            // var arreglo = $scope.datos;//$scope.chartConfigAreaSplineHistorico.series.data;
            console.log("proyeccion " + valor);
            var ultimo = $scope.datos[$scope.datos.length-1];
            var tam =$scope.datos.length+1;
            //$scope.datos.push($scope.proyeccion);
            $scope.datos.push(valor);
            sumaDatos+=valor;
            promedios += valor/ultimo;
            $scope.crecimiento.push(crecimiento);
            console.log("valor " + valor);
            for (var i = 1; i < $scope.cantProyecciones; i++) {
                if(proyeccion == 0)
                {
                    proyectado = sumaDatos/(tam);
                    crecimiento = proyectado/ultimo;
                    console.log("proyeccion, sumadatos, tamanio " + valor + sumaDatos + tam);
                    if (alternado==1) proyeccion = 1;
                }
                else
                {
                    console.log("promedios,tam-1 " + promedios + tam);
                    crecimiento = promedios/(tam-1);
                    proyectado = crecimiento*ultimo;
                    if (alternado==1) proyeccion = 0;
                }
                sumaDatos+=proyectado;
                promedios += crecimiento;
                $scope.datos.push(proyectado);
                $scope.crecimiento.push(crecimiento);
                sumaDatos-= $scope.datos[i-1];
                promedios -= $scope.datos[i]/$scope.datos[i-1];
                console.log("crecimiento " + crecimiento);
                console.log("proyectado " + proyectado);
                console.log("ultimo " + ultimo + "promedios " + promedios + "proyectado " + proyectado + "ultimo elem de arreglo " + $scope.datos[$scope.datos.length-1]);
                ultimo = 0;
                //angular.copy(valor, ultimo);//origen,destino
                //console.log(myDest);
                //  angular.extend(ultimo,valor);
              //  console.log("valor " + valor.valueOf);
                ultimo = proyectado*1;
                //valor = 0;
               // valor = proyectado*1;
                //angular.copy(proyectado, valor);//origen,destino
               // console.log("ultimo " + ultimo + "valor " + valor);
                //  angular.extend(valor,proyectado);
              //  tam+=1;
            } /*var seriesArray = $scope.chartConfigAreaSplineProyeccion.series;
             var rndIdx = Math.floor(Math.random() * seriesArray.length);
             seriesArray[rndIdx].data = seriesArray[rndIdx].data.concat([1, 10, 20]);*/

        };

    }]);
