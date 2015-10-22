/**
 * Created by emi on 08/10/15.
 */
'use strict';

angular.module('sApobackOfficeFrontendApp')
    .factory('Template', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
        var API_REST_URL = REST_API.BASE_URL;
        console.log("En modelo Template");
        return $resource(API_REST_URL + ':recurso/:modulo/:submodulo/:id', {}, {
            crearTemplate   : { method: 'POST', params: { recurso: 'templates', modulo: 'create'}},
            getTemplate     : { method: 'GET', params: { recurso: 'templates' ,id: '@id'},  isArray: false },
            getTemplates    : { method: 'GET', params: { recurso: 'templates' },  isArray: true },
            actualizarTemplate   : { method: 'PUT', params: { recurso: 'templates',id: '@id'}},
            eliminarTemplate   : { method: 'DELETE', params: { recurso: 'templates',id: '@id'}}
        })
    }]);