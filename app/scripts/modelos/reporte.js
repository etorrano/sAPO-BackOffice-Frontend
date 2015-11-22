/**
 * Created by emi on 08/10/15.
 */
'use strict';

angular.module('sApobackOfficeFrontendApp')
    .factory('Reporte', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
        var API_REST_URL = REST_API.BASE_URL;
        var objeto = 'recursos';
        console.log("En modelo Producto");
        return $resource(API_REST_URL + ':recurso/:modulo/:submodulo/:id', {}, {

            //ABM genérico
            crear   : { method: 'POST', params: { recurso: objeto, modulo: 'create'}},
            get    : { method: 'GET', params: { recurso: objeto ,id: '@id'},  isArray: false },
            getLista    : { method: 'GET', params: { recurso: objeto },  isArray: true },
            actualizar   : { method: 'PUT', params: { recurso: objeto,id: '@id'}},
            eliminar   : { method: 'DELETE', params: { recurso: objeto,id: '@id'}},

            //Reportes
            movimientos : { method: 'GET', params: { recurso: 'reportes',modulo: 'movimientos', submodulo: 'stock'},  isArray: true },
            obtenerRegistrados    : { method: 'GET', params: { recurso: 'usuarios'},  isArray: true },
            obtenerReportes    : { method: 'GET', params: { recurso: 'reportes', modulo: 'global'},  isArray: false },
            obtenerTopGenericos    : { method: 'GET', params: { recurso: 'reportes', modulo: 'global'},  isArray: true },
            obtenerRecomProductos   : { method: 'GET', params: { recurso: 'algoritmos', modulo: 'productos'},  isArray: true },
            obtenerReporteMovimientos: { method: 'GET', params: { recurso: 'reportes', modulo: 'fraude', submodulo: '@dias'},  isArray: false }
            obtenerGanancias : { method: 'GET', params: { recurso: 'reportes', modulo: 'ganancias'},  isArray: false },
        })
    }])//function(account, credentials, successCb, errorCb)
    .factory('ReporteNodeJS', ['$http', '$resource', 'REST_API_NODEJS', function($http, $resource,REST_API_NODEJS) {
        var API_REST_URL = REST_API_NODEJS.BASE_URL;
        var objeto = 'recursos';
        console.log("En modelo Producto");
        return $resource(API_REST_URL + ':recurso/:modulo/:submodulo/:id', {}, {

            //ABM genérico
            crear   : { method: 'POST', params: { recurso: objeto, modulo: 'create'}},
            get    : { method: 'GET', params: { recurso: objeto ,id: '@id'},  isArray: false },
            getLista    : { method: 'GET', params: { recurso: objeto },  isArray: true },
            actualizar   : { method: 'PUT', params: { recurso: objeto,id: '@id'}},
            eliminar   : { method: 'DELETE', params: { recurso: objeto,id: '@id'}},

            //Reportes
            obtenerRecomProductos   : { method: 'GET', params: { recurso: 'algoritmos', modulo: 'productos'},  isArray: false }
        })
    }]);
