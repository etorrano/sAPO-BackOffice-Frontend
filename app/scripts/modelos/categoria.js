/**
 * Created by emi on 08/10/15.
 */
'use strict';

angular.module('sApobackOfficeFrontendApp')
    .factory('Categoria', ['$http', '$resource', 'REST_API', function($http, $resource, REST_API) {
        var API_REST_URL = REST_API.BASE_URL;
        console.log("En modelo Categoria");
        return $resource(API_REST_URL + ':recurso/:modulo/:submodulo/:id', {}, {
            crearCategoria   : { method: 'POST', params: { recurso: 'categorias', modulo: 'create'}},
            getCategoria     : { method: 'GET', params: { recurso: 'categorias' ,id: '@id'},  isArray: false },
            getCategorias    : { method: 'GET', params: { recurso: 'categorias' },  isArray: true },
            actualizarCategoria   : { method: 'PUT', params: { recurso: 'categorias',id: '@id'}},
            eliminarCategoria   : { method: 'DELETE', params: { recurso: 'categorias',id: '@id'}}
        })
    }]);