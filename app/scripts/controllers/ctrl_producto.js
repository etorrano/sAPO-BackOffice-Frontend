/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')

.controller('prodCtrl', ['productos',  function (almacenes) {

    this.init = function() {
        this.phones = almacenes;
    };

    this.init();
}])

.controller('CtrlListarProducto', ['$scope', 'ServicioProducto', '$routeParams', '$location',function($scope, ServicioProducto, $routeParams, $location) {
    console.log("En CtrlListarProductos");
    ServicioProducto.getProducto({id: $routeParams.id}).then(function(producto) {
        $scope.phone = producto;
    });

}])

.controller('CtrlListarProductos', ['$scope', 'ServicioProducto', '$routeParams', '$location',function($scope, ServicioProducto, $routeParams, $location) {
        console.log("En CtrlListarProductos");
        $scope.actualizarProducto = function (userId) {
            console.log("Redireccionando a CtrlActProd para actualizar producto con id: " + userId);
            $location.path('/productos-actualizar/' + userId);

            ServicioProducto.getProductos().then(function(productos) {
                $scope.phones = productos;
            });
        };
        ServicioProducto.getProductos().then(function(productos) {
        $scope.phones = productos;
         });
        $scope.crearProducto = function () {
            console.log("Redireccionando a CtrlActProd para crear producto");
            $location.path('/productos-crear');
        };

        $scope.eliminarProducto = function (userId) {
            console.log("Borrando producto con id: " + userId);
            ServicioProducto.eliminarProducto(userId);
            $location.path('/productos-listar');
            /*ServicioProducto.getProductos().then(function(productos) {
                $scope.phones = productos;
            });*/

        };

}])
/*
.controller('CtrlActProd', ['$scope', 'ServicioProducto', function($scope, ServicioProducto) {
    ServicioProducto.actualizarProducto($scope.producto.id);
    console.log("En CtrlActProd actualizando producto con id: " + $scope.producto.id);

}])
*/
.controller('CtrlActProd', ['$scope', 'ServicioProducto', '$routeParams', '$location',function($scope, ServicioProducto, $routeParams, $location) {
        console.log("En CtrlActProd con id: " + $routeParams.id);
        // callback for ng-click 'updateUser':
        $scope.actualizarProducto = function (productos) {
           console.log("En CtrlActProd actualizando producto con id: " + $scope.producto.id + $scope.producto.nombre + $scope.producto.descripcion);
           ServicioProducto.actualizarProducto($scope.producto);
           $location.path('/productos-listar');
        };
        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/productos-listar');
        };


        ServicioProducto.getProducto({id: $routeParams.id}).then(function(productos) {
            $scope.productos = productos;

        });
    }])

.controller('CtrlCrearProd', ['$scope', 'ServicioProducto', '$routeParams', '$location',
    function ($scope, ServicioProducto, $routeParams, $location) {
        // ng-click 'crear nuevo usuario':
        $scope.crearProducto = function (producto) {
            //$scope.productos.id = 101;
            console.log("En CtrlCrearProd creando producto con id: " + $scope.productos.nombre + $scope.productos.descripcion);
            ServicioProducto.crearProducto($scope.producto);
            $location.path('/productos-listar');
        };
    }]);