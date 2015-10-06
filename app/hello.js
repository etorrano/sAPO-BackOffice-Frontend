/**
 * Created by emi on 06/10/15.
 */
function Hello($scope, $http) {
    $http.get('https://sapo.azure-api.net/sapo/productos',
                {
                    headers: {
                                'Ocp-Apim-Subscription-Key': '9f86432ae415401db0383f63ce64c4fe',
                                'Content-Type':'application/json'
                             }

                }
             ).success(function(data)
                {
                    $scope.greeting = data;
                });
}