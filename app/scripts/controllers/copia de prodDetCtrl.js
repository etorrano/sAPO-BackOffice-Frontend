/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .controller('prodDetCtrl', ['$scope', '$routeParams', 'Phone',
        function($scope, $routeParams, $http) {
            $http.get('productos/' + $routeParams.phoneId + '.json').success(function(data) {
                $scope.phone = data;
            });
        }]);