/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')

.controller('prodCtrl', ['productos',  function (almacenes) {

    this.init = function() {
        this.productos = almacenes;
    };

    this.init();
}])

.controller('CtrlListarProducto', ['$scope', 'ServicioProducto', '$routeParams', '$location',function($scope, ServicioProducto, $routeParams, $location) {
    console.log("En CtrlListarProductos");
    ServicioProducto.getProducto({id: $routeParams.id}).then(function(producto) {
        $scope.producto = producto;
    });

}])

.controller('CtrlListarProductos', ['$scope', 'ServicioProducto', '$routeParams', '$location', 'NgTableParams', '$q',
        function($scope, ServicioProducto, $routeParams, $location, NgTableParams, $q) {
        console.log("En CtrlListarProductos");
        $scope.actualizar = function (userId) {
            console.log("Redireccionando a CtrlActProd para actualizar producto con id: " + userId);
            $location.path('/productos-actualizar/' + userId);
        };

        ServicioProducto.getProductos().then(function(productos)
        {
            $scope.productos = productos;
            $scope.tableParams = new NgTableParams(
                {
                    page: 1,          // primera página a mostrar
                    count: 5          // registros por página
                },
                {
                    data: $scope.productos
                }
            );
        });

        $scope.eliminar = function (producto) {
            console.log("Borrando producto con id: " + producto.id);
            var deferred = $q.defer();
            ServicioProducto.eliminarProducto(producto.id).then(function(res) {
                $location.path('/productos-listar');
                var index = $scope.productos.indexOf(producto);
                $scope.productos.splice(index, 1);
                $scope.tableParams.reload();
                deferred.resolve(res);
            }, function (error) {
                console.log("Error: " + error);
                deferred.reject(error);
            });
            return deferred.promise;
        };

}])

.controller('CtrlActProd', ['$scope', 'ServicioProducto', '$routeParams', '$location',function($scope, ServicioProducto, $routeParams, $location) {
        console.log("En CtrlActProd con id: " + $routeParams.id);
        // callback for ng-click 'updateUser':
        $scope.actualizarProducto = function () {
           console.log("En CtrlActProd actualizando producto con id: " + $scope.producto.i
            d + $scope.producto.nombre + $scope.producto.descripcion);
           ServicioProducto.actualizarProducto($scope.producto);
           $location.path('/productos-listar');
        };
        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/productos-listar');
        };


        ServicioProducto.getProducto($routeParams.id).then(function(producto) {
            $scope.producto = producto;

        });
    }])

.controller('CtrlCrearProd', ['$scope', 'ServicioCategoria', 'ServicioProducto', '$routeParams', '$location',
    function ($scope, ServicioCategoria, ServicioProducto, $routeParams, $location) {

        $scope.categoria= {};
       // $scope.selectedItem = {};
        ServicioCategoria.getCategorias().then(function(results) {
            $scope.categorias = results;
            $scope.categoria.seleccionada = $scope.categorias[0];
        });
        // ng-click 'crear nuevo usuario':
        $scope.crear = function () {
            $scope.producto.isgenerico = true;
            $scope.producto.categoria = $scope.categoria.seleccionada.id;
            console.log("En CtrlCrearProd creando producto con id: " + $scope.producto.nombre + $scope.producto.descripcion, $scope.categoria.seleccionada.nombre);
           // ServicioProducto.crearProducto($scope.producto);
            //$location.path('/productos-listar');
        };
    }]);