/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')

.controller('catCtrl', ['categorias',  function (almacenes) {

    this.init = function() {
        this.phones = almacenes;
    };

    this.init();
}])

.controller('CtrlListarCategoria', ['$scope', 'ServicioCategoria', '$routeParams', '$location',function($scope, ServicioCategoria, $routeParams, $location) {
    console.log("En CtrlListarCategorias");
    ServicioCategoria.getCategoria({id: $routeParams.id}).then(function(categoria) {
        $scope.phone = categoria;

    });

}])

.controller('CtrlListarCategorias', ['$scope', 'ServicioCategoria', '$routeParams', '$location',function($scope, ServicioCategoria, $routeParams, $location) {
        console.log("En CtrlListarCategorias");
        $scope.actualizarCategoria = function (userId) {
            console.log("Redireccionando a CtrlActCat para actualizar categoria con id: " + userId);
            $location.path('/categorias-actualizar/' + userId);

            ServicioCategoria.getCategorias().then(function(categorias) {
                $scope.phones = categorias;
            });
        };
        ServicioCategoria.getCategorias().then(function(categorias) {
        $scope.phones = categorias;
         });
        $scope.crearCategoria = function () {
            console.log("Redireccionando a CtrlActCat para crear categoria");
            $location.path('/user-creation');
        };

        $scope.eliminarCategoria = function (userId) {
            console.log("Borrando categoria con id: " + userId);
            ServicioCategoria.eliminarCategoria(userId);
            $location.path('/');
            /*ServicioCategoria.getCategorias().then(function(categorias) {
                $scope.phones = categorias;
            });*/

        };

}])
/*
.controller('CtrlActCat', ['$scope', 'ServicioCategoria', function($scope, ServicioCategoria) {
    ServicioCategoria.actualizarCategoria($scope.categoria.id);
    console.log("En CtrlActCat actualizando categoria con id: " + $scope.categoria.id);

}])
*/
.controller('CtrlActCat', ['$scope', 'ServicioCategoria', '$routeParams', '$location',function($scope, ServicioCategoria, $routeParams, $location) {
        console.log("En CtrlActCat con id: " + $routeParams.id);
        // callback for ng-click 'updateUser':
        $scope.actualizarCategoria = function (categorias) {
           console.log("En CtrlActCat actualizando categoria con id: " + $scope.categorias.id + $scope.categorias.nombre + $scope.categorias.descripcion);
           ServicioCategoria.actualizarCategoria($scope.categorias);
           $location.path('/categorias-listar');
        };
        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/categorias-listar');
        };


        ServicioCategoria.getCategoria({id: $routeParams.id}).then(function(categorias) {
            $scope.categorias = categorias;

        });
    }])

    .controller('CtrlCrearCat', ['$scope', 'ServicioProducto', '$routeParams', '$location', '$filter', 'ngTableParams', 'ServicioCategoria',
        function ($scope, ServicioProducto, $routeParams, $location, $filter, ngTableParams, ServicioCategoria) {
            // ng-click 'crear nuevo usuario':

            var productos = [];
            ServicioProducto.getProductos().then(function(results)
            {
                productos = results;
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
                if (!$scope.producto) {
                    return;
                }
                var checked = 0, unchecked = 0,
                    total = $scope.producto.length;
                angular.forEach($scope.producto, function(item) {
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
             $scope.seleccionados = $filter('filter')($scope.productos, {checked: true});
             console.log("seleccionado "+ $scope.seleccionados);
             }*/
            $scope.continuar = function()
            {
                //$scope.categorias.id = 101;
                console.log("En CtrlCrearProd creando categoria con id: " + $scope.categoria.nombre + $scope.categoria.descripcion);
                $scope.categoria.productos=[];
                $scope.categoria.id = null;

                $scope.categoria.isgenerico = true;
                // loop through all checkboxes
                angular.forEach(productos, function(item, key) {
                    console.log("Verificar productos seleccionadas");
                    if($scope.checkboxes.items[item.id]) {
                        console.log("seleccionado "+ item.id + item);
                        $scope.categoria.productos.push(item); // push checked items to array
                    }
                });
                ServicioCategoria.crearCategoria($scope.categoria);
                $location.path('/categorias-listar');

                //$scope.cats=cats;
                /* var cats=[];
                 angular.forEach($scope.checkboxes.items, function(item) {

                 console.log("En listar item " + item);
                 console.log("En listar id item " + $scope.checkboxes.items.indexOf(item));
                 cats.push($scope.productos[$scope.checkboxes.indexOf(item)]);
                 });*/
                // console.log(cats);
            };
        }]);