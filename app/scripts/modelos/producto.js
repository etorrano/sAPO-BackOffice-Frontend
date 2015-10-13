/**
 * Created by emi on 08/10/15.
 */
'use strict';

angular.module('sApobackOfficeFrontendApp')
    .factory('Producto', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
        var API_REST_URL = REST_API.BASE_URL;

        return $resource(API_REST_URL + ':recurso/:modulo/:submodulo/:id', { id: '@id' }, {
            crearProducto   : { method: 'POST', params: { recurso: 'productos'}},
            getProducto     : { method: 'GET', params: { recurso: 'productos' },  isArray: false },
            getProductos    : { method: 'GET', params: { recurso: 'productos' },  isArray: true },
            actualizarProducto   : { method: 'PUT', params: { recurso: 'productos'}},
            eliminarProducto   : { method: 'DELETE', params: { recurso: 'productos'}},
        })
    }]);