/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .service('ServicioProducto', ['$q', 'Producto', function ($q, Producto) {

        this.init = function () {};

        this.getProducto = function(id) {
            var deferred = $q.defer();
            Producto.getProducto({ id: id }, {}, function (producto) {
                deferred.resolve(producto);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.getProductos = function() {
            console.log("Obtener productos(get)");
            var deferred = $q.defer();
            Producto.getProductos({}, {}, function (productos) {
                console.log(productos);
                deferred.resolve(productos);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }]);