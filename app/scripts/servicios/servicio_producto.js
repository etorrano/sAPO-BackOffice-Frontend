/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .service('ServicioProducto', ['$q', 'Producto', function ($q, Producto) {

        this.init = function () {};
        console.log("En ServicioProducto");
        this.getProducto = function(id) {
            var deferred = $q.defer();
            console.log("Get producto con id:" + id);
            Producto.getProducto({ id: 1 }, {}, function (productos) {
                deferred.resolve(productos);
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

        this.crearProducto = function(id) {
            var deferred = $q.defer();
            Producto.crearProducto({ id: id }, {}, function (producto) {
                deferred.resolve(producto);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.actualizarProducto = function(productos) {
            var deferred = $q.defer();
            Producto.actualizarProducto({ id: 1 }, {}, function (productos) {
                console.log("actualizando producto con id: " + producto.id);
                deferred.resolve(producto);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.eliminarProducto = function(id) {
            var deferred = $q.defer();
            Producto.eliminarProducto({ id: id }, {}, function (producto) {
                deferred.resolve(producto);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }]);