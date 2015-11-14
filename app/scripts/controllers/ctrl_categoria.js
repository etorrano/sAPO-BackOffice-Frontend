/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')

.controller('catCtrl', ['categorias',  function (almacenes) {

    this.init = function() {
        this.categorias = almacenes;
    };

    this.init();
}])

.controller('CtrlListarCategoria', ['$scope', 'ServicioCategoria', '$routeParams', '$location',function($scope, ServicioCategoria, $routeParams, $location) {
    console.log("En CtrlListarCategorias");
    ServicioCategoria.getCategoria($routeParams.id).then(function(categoria) {
        $scope.categoria = categoria;
    });

}])

.controller('CtrlListarCategorias', ['$scope', '$q', 'ServicioCategoria', '$routeParams', '$location','$filter', 'NgTableParams',function($scope, $q, ServicioCategoria, $routeParams, $location,$filter, NgTableParams) {
        console.log("En CtrlListarCategorias");
        $scope.actualizarCategoria = function (id) {
            console.log("Redireccionando a CtrlActCat para actualizar categoria con id: " + id);
            $location.path('/categorias-actualizar/' + id);
        };

        ServicioCategoria.getCategorias().then(function(categorias) 
        {
            $scope.categorias = categorias;
            $scope.tableParams = new NgTableParams(
                {
                    page: 1,          // primera página a mostrar
                    count: 5          // registros por página
                },
                {
                    data: $scope.categorias
                }
            );
        });

        $scope.eliminar = function (categoria) {
            console.log("Borrando categoria con id: " + categoria.id);
            var deferred = $q.defer();
            ServicioCategoria.eliminarCategoria(categoria.id).then(function(res) {
                var index = $scope.categorias.indexOf(categoria);
                $scope.categorias.splice(index, 1);
                $scope.tableParams.reload();
                $location.path('/categorias-listar');
                deferred.resolve(res);
            }, function (error) {
                console.log("Error: " + error);
                deferred.reject(error);
            });
            return deferred.promise;
        };

}])

.controller('CtrlActCat', ['$scope', 'ServicioCategoria', '$routeParams', '$location',function($scope, ServicioCategoria, $routeParams, $location) {
        console.log("En CtrlActCat con id: " + $routeParams.id);
        // callback for ng-click 'updateUser':
        $scope.actualizarCategoria = function (categorias) {
           console.log("En CtrlActCat actualizando categoria con id: " + $scope.categoria.id + $scope.categoria.nombre + $scope.categoria.descripcion);
           ServicioCategoria.actualizarCategoria($scope.categoria);
           $location.path('/categorias-listar');
        };
        // ng-click 'cancel':
        $scope.cancelar = function () {
            $location.path('/categorias-listar');
        };


        ServicioCategoria.getCategoria($routeParams.id).then(function(categoria) {
            $scope.categoria = categoria;

        });
    }])

    .controller('CtrlCrearCat', ['$scope', 'ServicioProducto', '$routeParams', '$location', '$filter', 'ngTableParams', 'ServicioCategoria',
        function ($scope, ServicioProducto, $routeParams, $location, $filter, ngTableParams, ServicioCategoria) {
            // ng-click 'crear nuevo usuario':
/*
            var productos = [];
            ServicioProducto.getProductos().then(function(results)
            {
                $scope.tableParams = new ngTableParams(
                    {
                        page: 1,          // primera página a mostrar
                        count: 5          // registros por página
                    },
                    {
                        total: results.length, // resultados en total
                        getData: function($defer, params)
                        {                            $defer.resolve(results.slice((params.page() - 1) * params.count(), params.page() * params.count()));
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

            */
            $scope.continuar = function()
            {
                console.log("En CtrlCrearCat creando categoria con id: " + $scope.categoria.nombre + $scope.categoria.descripcion);
               // $scope.categoria.productos=[];
                $scope.categoria.isgenerico = true;
                /*
                // loop through all checkboxes
                angular.forEach(productos, function(item, key) {
                    console.log("Verificar productos seleccionadas");
                    if($scope.checkboxes.items[item.id]) {
                        console.log("seleccionado "+ item.id + item);
                        $scope.categoria.productos.push(item); // push checked items to array
                    }
                });*/
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