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

.controller('CtrlListarTemplates', ['$scope', 'ServicioTemplate', '$routeParams', '$location',function($scope, ServicioTemplate, $routeParams, $location) {
        console.log("En CtrlListarTemplates");
        $scope.actualizarTemplate = function (userId) {
            console.log("Redireccionando a CtrlActProd para actualizar template con id: " + userId);
            $location.path('/templates-actualizar/' + userId);

            ServicioTemplate.getTemplates().then(function(templates) {
                $scope.phones = templates;

            });
        };
        ServicioTemplate.getTemplates().then(function(templates) {
        $scope.phones = templates;
         });
        $scope.crearTemplate = function () {
            console.log("Redireccionando a CtrlActProd para crear template");
            $location.path('/templates-crear');
        };

        $scope.eliminarTemplate = function (userId) {
            console.log("Borrando template con id: " + userId);
            ServicioTemplate.eliminarTemplate(userId);
            $location.path('/');
            /*ServicioTemplate.getTemplates().then(function(templates) {
                $scope.phones = templates;
            });*/

        };

}])
/*
.controller('CtrlActProd', ['$scope', 'ServicioTemplate', function($scope, ServicioTemplate) {
    ServicioTemplate.actualizarTemplate($scope.template.id);
    console.log("En CtrlActProd actualizando template con id: " + $scope.template.id);

}])
*/
.controller('CtrlActTemp', ['$scope', 'ServicioTemplate', '$routeParams', '$location',function($scope, ServicioTemplate, $routeParams, $location) {
        console.log("En CtrlActTemp con id: " + $routeParams.id);
        // callback for ng-click 'updateUser':
        $scope.actualizarTemplate = function (templates) {
           console.log("En CtrlActProd actualizando template con id: " + $scope.templates + $scope.templates.nombre + $scope.templates.descripcion);
            $scope.templates.categorias = [];
            ServicioTemplate.actualizarTemplate($scope.templates);
           $location.path('/templates-listar');
        };
        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/templates-listar');
        };


        ServicioTemplate.getTemplate({id: $routeParams.id}).then(function(templates) {
            $scope.templates = templates;

        });
    }])

.controller('CtrlCrearTemp', ['$scope', 'ServicioTemplate', '$routeParams', '$location', '$filter', 'ngTableParams', 'ServicioCategoria',
    function ($scope, ServicioTemplate, $routeParams, $location, $filter, ngTableParams, ServicioCategoria) {
        // ng-click 'crear nuevo usuario':

        var categorias = [];
        ServicioCategoria.getCategorias().then(function(results)
        {
            categorias = results;
            /* angular.forEach(results, function(categoria) {
             categorias = results;
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

        $scope.checkboxes = { 'checked': false, items: {} };

        // watch for check all checkbox
        $scope.$watch('checkboxes.checked', function(value) {
            angular.forEach($scope.orderedData, function(item) {
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
                angular.forEach(categorias, function(item, key) {
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