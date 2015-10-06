/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .controller('prodCtrl', ['$scope', 'productos',
        function($scope, productos) {
            $scope.phones = productos.getProductos();
        }]);


