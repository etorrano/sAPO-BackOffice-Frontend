/**
 * Created by emi on 08/10/15.
 */
'use strict';

angular.module('sApobackOfficeFrontendApp')
    .factory('Generico', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
        var API_REST_URL = REST_API.BASE_URL;
        console.log("En modelo generico: ");
        return $resource(API_REST_URL + ':recurso/:modulo/:submodulo/:id', {}, {
            crear   : { method: 'POST', params: { recurso: 'notificaciones/limitecuenta', modulo: 'create'}},
            get    : { method: 'GET', params: { recurso: '@recurso' ,id: '@id'},  isArray: false },
            getLista    : { method: 'GET', params: { recurso: '@recurso' },  isArray: true },
            actualizar   : { method: 'PUT', params: { recurso: '@recurso',id: '@id'}},
            eliminar   : { method: 'DELETE', params: { recurso: '@recurso',id: '@id'}}
        })
    }]);