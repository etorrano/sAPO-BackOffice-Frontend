/**
 * Created by emi on 08/10/15.
 */
'use strict';

angular.module('sApobackOfficeFrontendApp')
    .factory('Producto', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
        var API_REST_URL = REST_API.BASE_URL;
        console.log("En modelo Producto");
        return $resource(API_REST_URL + ':recurso/:modulo/:submodulo/:id', {}, {
            crearProducto   : { method: 'POST', params: { recurso: 'productos', modulo: 'create'}},
            getProducto     : { method: 'GET', params: { recurso: 'productos' ,id: '@id'},  isArray: false },
            getProductos    : { method: 'GET', params: { recurso: 'productos' },  isArray: true },
            actualizarProducto   : { method: 'PUT', params: { recurso: 'productos',id: '@id'}},
            eliminarProducto   : { method: 'DELETE', params: { recurso: 'productos',id: '@id'}}
        })
    }]);