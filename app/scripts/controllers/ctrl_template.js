/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')

    .controller('tempCtrl', ['templates',  function (almacenes) {

        this.init = function() {
            this.phones = almacenes;
        };

        this.init();
    }])

    .controller('CtrlListarTemplate', ['$scope', 'ServicioTemplate', '$routeParams', '$location',function($scope, ServicioTemplate, $routeParams, $location) {
        console.log("En CtrlListarTemplates");
        ServicioTemplate.getTemplate({id: $routeParams.id}).then(function(template) {
            $scope.phone = template;

        });

    }])

    .controller('CtrlListarTemplates', ['$scope', 'ServicioTemplate', '$routeParams', '$location', 'NgTableParams', '$q',
        function($scope, ServicioTemplate, $routeParams, $location, NgTableParams, $q) {
            console.log("En CtrlListarTemplates");
            $scope.actualizar = function (id) {
                console.log("Redireccionando a CtrlActProd para actualizar template con id: " + id);
                $location.path('/templates-actualizar/' + id);
            };

            ServicioTemplate.getTemplates().then(function(templates)
            {
                $scope.templates = templates;
                $scope.tableParams = new NgTableParams(
                    {
                        page: 1,          // primera página a mostrar
                        count: 5          // registros por página
                    },
                    {
                        data: $scope.templates
                    }
                );
            });

            $scope.eliminar = function (template) {
                console.log("Borrando template con id: " + template.id);
                var deferred = $q.defer();
                ServicioTemplate.eliminarTemplate(template.id).then(function(res) {
                    $location.path('/templates-listar');
                    var index = $scope.templates.indexOf(template);
                    $scope.templates.splice(index, 1);
                    $scope.tableParams.reload();
                    deferred.resolve(res);
                }, function (error) {
                    console.log("Error: " + error);
                    deferred.reject(error);
                });
                return deferred.promise;
            };
        }])

    .controller('CtrlActTemp', ['$scope','$q', 'ServicioTemplate', '$routeParams', '$location', '$filter', 'ngTableParams', 'ServicioCategoria',
        function ($scope, $q, ServicioTemplate, $routeParams, $location, $filter, ngTableParams, ServicioCategoria) {
            // ng-click 'crear nuevo usuario':

            // var categorias = [];
            ServicioTemplate.getTemplate({id: $routeParams.id}).then(function(template) {
                $scope.template = template;
                console.log("Agregar categorias del template como seleccionadas");
                angular.forEach($scope.template.categorias, function(item, key) {
                    console.log("seleccionado "+ item.id + item);
                    $scope.checkboxes.items[item.id] = true; // push checked items to array
                });
                $q.all($scope.checkboxes.items).then(function(data){
                    console.log("Se agregaron las categorias, se crea tabla");
                    ServicioCategoria.getCategorias().then(function(results)
                    {
                        $scope.categorias = results;
                        /*$q.all($scope.categorias).then(function(data){
                         angular.forEach($scope.template.categorias, function(item, key) {
                         console.log("seleccionado "+ item.id + item);
                         $scope.checkboxes.items[item.id] = item; // push checked items to array
                         });
                         });*/

                        $scope.tableParams = new ngTableParams(
                            {
                                page: 1,          // primera página a mostrar
                                count: 5          // registros por página
                            },
                            {
                                data: $scope.categorias
                            }
                        );
                    });
                });

                //.then(function() {

                // });
            });

            $scope.checkboxes = { 'checked': false, items: {} };

            // watch for check all checkbox
            $scope.$watch('checkboxes.checked', function(value) {
                console.log("checkboxes.checked");
                angular.forEach($scope.categorias, function(item) {
                    if (angular.isDefined(item.id)) {
                        $scope.checkboxes.items[item.id] = value;
                    }
                });
            });

            // watch for data checkboxes
            $scope.$watch('checkboxes.items', function(values) {
                console.log("checkboxes.items");
                if (!$scope.categoria) {
                    return;
                }
                var checked = 0, unchecked = 0,
                    total = $scope.categoria.length;
                angular.forEach($scope.categoria, function(item) {
                    checked   +=  ($scope.checkboxes.items[item.id]) || 0;
                    unchecked += (!$scope.checkboxes.items[item.id]) || 0;
                });
                if ((unchecked == 0) || (checked == 0)) {
                    $scope.checkboxes.checked = (checked == total);
                }
                // grayed checkbox
                angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
            }, true);
            /*
             $scope.seleccionar = function () {
             $scope.seleccionados = $filter('filter')($scope.categorias, {checked: true});
             console.log("seleccionado "+ $scope.seleccionados);
             }*/
            $scope.continuar = function()
            {
                //$scope.templates.id = 101;
                console.log("En CtrlActTemp actualizando template con id: " + $scope.template.id + $scope.template.nombre + $scope.template.descripcion);
                $scope.template.categorias=[];
                //$scope.template.id = null;
                // loop through all checkboxes
                angular.forEach($scope.categorias, function(item, key) {
                    console.log("Verificar categorias seleccionadas");
                    if($scope.checkboxes.items[item.id]) {
                        console.log("seleccionado "+ item.id + item);
                        $scope.template.categorias.push(item); // push checked items to array
                    }
                });
                ServicioTemplate.actualizarTemplate($scope.template);
                $location.path('/templates-listar');

                //$scope.cats=cats;
                /* var cats=[];
                 angular.forEach($scope.checkboxes.items, function(item) {

                 console.log("En listar item " + item);
                 console.log("En listar id item " + $scope.checkboxes.items.indexOf(item));
                 cats.push($scope.categorias[$scope.checkboxes.indexOf(item)]);
                 });*/
                // console.log(cats);
            }

        }])

    .controller('CtrlCrearTemp', ['$scope', 'ServicioTemplate', '$routeParams', '$location', '$filter', 'ngTableParams', 'ServicioCategoria',
        function ($scope, ServicioTemplate, $routeParams, $location, $filter, ngTableParams, ServicioCategoria) {
            // ng-click 'crear nuevo usuario':

            // var categorias = [];
            ServicioCategoria.getCategorias().then(function(results)
            {
                $scope.categorias = results;
                /* angular.forEach(results, function(categoria) {
                 categorias = results;
                 });*/
                $scope.tableParams = new ngTableParams(
                    {
                        page: 1,          // primera página a mostrar
                        count: 5,       // registros por página
                        sorting: {
                            seleccionado: 'asc'
                        }
                    },
                    {
                        data: $scope.categorias
                        /* total: results.length, // resultados en total
                         getData: function($defer, params)
                         {
                         $defer.resolve(results.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                         }*/
                    }
                );
            });

            $scope.seleccionado = function(id){
                return $scope.checkboxes.items[id];
            };

            $scope.checkboxes = { 'checked': false, items: {} };

            // watch for check all checkbox
            $scope.$watch('checkboxes.checked', function(value) {
                angular.forEach($scope.categorias, function(item) {
                    if (angular.isDefined(item.id)) {
                        $scope.checkboxes.items[item.id] = value;
                    }
                });
            });

            // watch for data checkboxes
            $scope.$watch('checkboxes.items', function(values) {
                if (!$scope.categoria) {
                    return;
                }
                var checked = 0, unchecked = 0,
                    total = $scope.categoria.length;
                angular.forEach($scope.categoria, function(item) {
                    checked   +=  ($scope.checkboxes.items[item.id]) || 0;
                    unchecked += (!$scope.checkboxes.items[item.id]) || 0;
                });
                if ((unchecked == 0) || (checked == 0)) {
                    $scope.checkboxes.checked = (checked == total);
                }
                // grayed checkbox
                angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
            }, true);
            /*
             $scope.seleccionar = function () {
             $scope.seleccionados = $filter('filter')($scope.categorias, {checked: true});
             console.log("seleccionado "+ $scope.seleccionados);
             }*/
            $scope.continuar = function()
            {
                //$scope.templates.id = 101;
                console.log("En CtrlCrearProd creando template con id: " + $scope.template.nombre + $scope.template.descripcion);
                $scope.template.categorias=[];
                $scope.template.id = null;
                // loop through all checkboxes
                angular.forEach($scope.categorias, function(item, key) {
                    console.log("Verificar categorias seleccionadas");
                    if($scope.checkboxes.items[item.id]) {
                        console.log("seleccionado "+ item.id + item);
                        $scope.template.categorias.push(item); // push checked items to array
                    }
                });
                ServicioTemplate.crearTemplate($scope.template);
                $location.path('/templates-listar');

                //$scope.cats=cats;
                /* var cats=[];
                 angular.forEach($scope.checkboxes.items, function(item) {

                 console.log("En listar item " + item);
                 console.log("En listar id item " + $scope.checkboxes.items.indexOf(item));
                 cats.push($scope.categorias[$scope.checkboxes.indexOf(item)]);
                 });*/
                // console.log(cats);
            };
        }]);