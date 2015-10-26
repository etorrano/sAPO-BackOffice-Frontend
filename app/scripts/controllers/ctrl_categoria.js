/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')

.controller('prodCtrl', ['categorias',  function (almacenes) {

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
            console.log("Redireccionando a CtrlActProd para actualizar categoria con id: " + userId);
            //$location.path('/user-detail/' + userId);

            ServicioCategoria.getCategorias().then(function(categorias) {
                $scope.phones = categorias;

                $location.path('/categorias/' + categorias.nombre);
            });
        };
        ServicioCategoria.getCategorias().then(function(categorias) {
        $scope.phones = categorias;
         });
        $scope.crearCategoria = function () {
            console.log("Redireccionando a CtrlActProd para crear categoria");
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
.controller('CtrlActProd', ['$scope', 'ServicioCategoria', function($scope, ServicioCategoria) {
    ServicioCategoria.actualizarCategoria($scope.categoria.id);
    console.log("En CtrlActProd actualizando categoria con id: " + $scope.categoria.id);

}])
*/
.controller('CtrlActProd', ['$scope', 'ServicioCategoria', '$routeParams', '$location',function($scope, ServicioCategoria, $routeParams, $location) {
        console.log("En CtrlActProd con id: " + $routeParams.id);
        // callback for ng-click 'updateUser':
        $scope.actualizarCategoria = function (categorias) {
           console.log("En CtrlActProd actualizando categoria con id: " + $scope.categorias.id + $scope.categorias.nombre + $scope.categorias.descripcion);
           ServicioCategoria.actualizarCategoria($scope.categorias);
           $location.path('/user-list');
        };
        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/user-list');
        };


        ServicioCategoria.getCategoria({id: $routeParams.id}).then(function(categorias) {
            $scope.categorias = categorias;

        });
    }])

.controller('CtrlCrearProd', ['$scope', 'ServicioCategoria', '$routeParams', '$location',
    function ($scope, ServicioCategoria, $routeParams, $location) {
        // ng-click 'crear nuevo usuario':
        $scope.crearCategoria = function (categorias) {
            //$scope.categorias.id = 101;
            console.log("En CtrlCrearProd creando categoria con id: " + $scope.categorias.nombre + $scope.categorias.descripcion);
            ServicioCategoria.crearCategoria($scope.categorias);
            $location.path('/user-list');
        };
    }]);