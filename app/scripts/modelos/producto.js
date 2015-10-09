/**
 * Created by emi on 08/10/15.
 */
'use strict';

angular.module('sApobackOfficeFrontendApp')
    .factory('Producto', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
        var API_REST_URL = REST_API.BASE_URL;

        return $resource(API_REST_URL + ':recurso/:modulo/:submodulo/:id', { id: '@id' }, {
            getProducto        : { method: 'get', params: { recurso: 'productos' },  isArray: false },
            getProductos      : { method: 'get', params: { recurso: 'productos' },  isArray: true },
        })
    }]);