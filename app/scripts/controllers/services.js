'use strict';

/* Services */
/*
var ServiciosSAPO = angular.module('sApobackOfficeFrontendApp', ['ngResource']);

ServiciosSAPO.factory('User', function($resource) {
    var User = $resource('https://sapo.azure-api.net/sapo/productos', { }, {
        query: {
            method: 'GET',
            isArray: true,
            headers: {
                        'Ocp-Apim-Subscription-Key': '9f86432ae415401db0383f63ce64c4fe',
                        'Content-Type':'application/json'
                     }
        }
    });
    return User
});*//*
var ServiciosSAPO = angular.module('sApobackOfficeFrontendApp');
ServiciosSAPO*/

    /*.factory('productos', ['$http', function($http) {

        var urlBase = 'https://sapo.azure-api.net/sapo/productos';
        var dataFactory = {};

        dataFactory.getProductos = function () {
            return $http.get(
                urlBase, {
                    headers: {
                        'Ocp-Apim-Subscription-Key': '9f86432ae415401db0383f63ce64c4fe',
                        'Content-Type': 'application/json'
                    }
                }).then(function (response) {
                    var result = [];
                    angular.forEach(response.data, function (value, key) {
                        result[key] = new Resource(value);
                    });
                    return result;
                });
        }
}]);

.service('APIInterceptor', function($rootScope, UserService) {
    var service = this;

    service.request = function(config) {
      /*  var currentUser = UserService.getCurrentUser(),
            access_token = currentUser ? currentUser.access_token : null;

        if (access_token) {
            config.headers.authorization = access_token;
        }
        config.headers[] =
        return config;
    };

    service.responseError = function(response) {
        if (response.status === 401) {
            $rootScope.$broadcast('unauthorized');
        }
        return response;
    };
})

ServiciosSAPO.factory('productos', ['$resource',
  function($resource){
    var Project = $resource('https://sapo.azure-api.net/sapo/productos',{},
            {

                          method: 'GET',
                          headers:{
                                    'Ocp-Apim-Subscription-Key': '9f86432ae415401db0383f63ce64c4fe',
                                    'Content-Type':'application/json'
                                   },
                          params: {phoneId:'phones'},
                          isArray:true

            });
   return Project;
 }]);*/

/*
      get:function(params, success, error) {

        var res = $resource( 'https://sapo.azure-api.net/sapo/productos/:id', null, {
          'get' : {
            method: 'GET',
            headers: {'Ocp-Apim-Subscription-Key': '9f86432ae415401db0383f63ce64c4fe'},
            params: {phoneId: 'productos'}
          }
        });
        return res.get({id:params.id}, success, error);
      }
    };
    return Productos;
  }]);*/

