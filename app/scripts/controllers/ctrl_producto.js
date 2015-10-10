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

.controller('CtrlListarProductos', ['$scope', 'ServicioProducto', function($scope, ServicioProducto) {
        ServicioProducto.getProductos().then(function(productos) {
        $scope.phones = productos;
    });

}]);

app.controller('CtrlActProd', ['$scope', '$routeParams', 'Producto', '$location',
    function ($scope, $routeParams, UserFactory, $location) {

        // ng-click 'actualizarProducto':
        $scope.actualizarProducto = function () {
            Producto.actualizarProducto()($scope.producto);
            $location.path('/user-list');
        };

        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/user-list');
        };

        $scope.producto = Producto.getProducto({id: $routeParams.id});
    }]);

app.controller('CtrlCrearProd', ['$scope', 'Producto', '$location',
    function ($scope, UsersFactory, $location) {

        // ng-click 'crear nuevo usuario':
        $scope.crearProducto = function () {
            Producto.create($scope.producto);
            $location.path('/user-list');
        }
    }]);