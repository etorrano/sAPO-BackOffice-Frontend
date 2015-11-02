/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .config(['$httpProvider', '$injector', function ($httpProvider, $injector) {
        // http interceptor when not authorized or authenticated
        console.log("Interceptor, no autorizado o autenticado");
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('HttpInterceptor');
            }
        ]);
    }])
    .factory('HttpInterceptor', ['REST_API','$window', '$q', '$injector', '$location', 'ServicioAutenticacionAdmin', function (REST_API,$window, $q, $injector, $location, ServicioAutenticacionAdmin) {
        console.log("HttpInterceptor");
        return {
            request: function (config) {
                console.log("Request");
                config.headers['Ocp-Apim-Subscription-Key'] = REST_API.OCP_KEY;
                /*config.withCredentials = true;*/
                config.contentType = 'application/json; charset=utf-8';
                console.log("token");
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            requestError: function(rejection) {
                console.log("ReqError");
                return $q.reject(rejection);
            },

            /* Set Authentication.autenticado to true if 200 received */
            response: function (response) {
                console.log("Response");
                if (response != null && response.status == 200 && $window.sessionStorage.token && !ServicioAutenticacionAdmin.autenticado) {
                    ServicioAutenticacionAdmin.autenticado = true;
                }
                return response || $q.when(response);
            },

            /* Revoke client authentication if 401 is received */
            responseError: function(rejection) {
                console.log("RespError");
                if (rejection != null && rejection.status === 401 && ($window.sessionStorage.token || ServicioAutenticacionAdmin.autenticado)) {
                    delete $window.sessionStorage.token;
                    ServicioAutenticacionAdmin.autenticado = false;
                    $location.path("/admin/login");
                }

                return $q.reject(rejection);
            }
        };
    }]);