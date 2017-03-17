/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .controller('prodCtrl', ['$scope', '$http',
    function ($scope, $http) {
        $http.get('productos/phones.json').success(function(data) {
            $scope.phones = data;
        });

        $scope.orderProp = 'age';
    }]);