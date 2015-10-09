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
