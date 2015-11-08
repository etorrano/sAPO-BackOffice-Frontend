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
            obtenerRegistrados    : { method: 'GET', params: { recurso: 'usuarios'},  isArray: true }
        })
    }]);