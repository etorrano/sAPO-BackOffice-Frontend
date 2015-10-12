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

.controller('CtrlListarProductos', ['$scope', 'ServicioProducto', '$routeParams', '$location',function($scope, ServicioProducto, $routeParams, $location) {
        $scope.actualizarProducto = function (userId) {
            $location.path('/user-detail/' + userId);
        };
        ServicioProducto.getProductos().then(function(productos) {
        $scope.phones = productos;

    });

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
        $scope.actualizarProducto = function () {
            console.log("En CtrlActProd actualizando producto con id: " + $scope.phone.id);
           ServicioProducto.actualizarProducto($scope.phone);
           // $location.path('/user-list');
        };
        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/user-list');
        };

        ServicioProducto.getProducto({id: $routeParams.id}).then(function(productos) {
            $scope.productos = productos;

        });
    }])

.controller('CtrlCrearProd', ['$scope', 'Producto', '$location',
    function ($scope, Producto, $location) {

        // ng-click 'crear nuevo usuario':
        $scope.crearProducto = function () {
            Producto.create($scope.producto);
            $location.path('/user-list');
        }
    }]);