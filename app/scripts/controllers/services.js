'use strict';

/* Services */

var ServiciosSAPO = angular.module('phonecatServices', ['ngResource']);

ServiciosSAPO.factory('productos', ['$resource',
  function($resource){
    var Productos = {

      get:function(params, success, error) {

        var res = $resource( 'https://sapo.azure-api.net/sapo/productos/:id', null, {
          'get' : { method:'GET', headers: {'Ocp-Apim-Subscription-Key': '9f86432ae415401db0383f63ce64c4fe'}}
        });
        return res.get({id:params.id}, success, error);
      }
    };
    return Productos;
  }]);

