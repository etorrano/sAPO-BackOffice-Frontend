/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')

.controller('prodCtrl', ['templates',  function (almacenes) {

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
            //$location.path('/user-detail/' + userId);

            ServicioTemplate.getTemplates().then(function(templates) {
                $scope.phones = templates;

                $location.path('/templates/' + templates.nombre);
            });
        };
        ServicioTemplate.getTemplates().then(function(templates) {
        $scope.phones = templates;
         });
        $scope.crearTemplate = function () {
            console.log("Redireccionando a CtrlActProd para crear template");
            $location.path('/user-creation');
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
.controller('CtrlActProd', ['$scope', 'ServicioTemplate', '$routeParams', '$location',function($scope, ServicioTemplate, $routeParams, $location) {
        console.log("En CtrlActProd con id: " + $routeParams.id);
        // callback for ng-click 'updateUser':
        $scope.actualizarTemplate = function (templates) {
           console.log("En CtrlActProd actualizando template con id: " + $scope.templates.id + $scope.templates.nombre + $scope.templates.descripcion);
           ServicioTemplate.actualizarTemplate($scope.templates);
           $location.path('/user-list');
        };
        // ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/user-list');
        };


        ServicioTemplate.getTemplate({id: $routeParams.id}).then(function(templates) {
            $scope.templates = templates;

        });
    }])

.controller('CtrlCrearProd', ['$scope', 'ServicioTemplate', '$routeParams', '$location',
    function ($scope, ServicioTemplate, $routeParams, $location) {
        // ng-click 'crear nuevo usuario':
        $scope.crearTemplate = function (templates) {
            //$scope.templates.id = 101;
            console.log("En CtrlCrearProd creando template con id: " + $scope.templates.nombre + $scope.templates.descripcion);
            ServicioTemplate.crearTemplate($scope.templates);
            $location.path('/user-list');
        };
    }]);