/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .service('ServicioProducto', ['$q', 'Producto', function ($q, Producto) {

        this.init = function () {};
        console.log("En ServicioProducto");
        this.getProducto = function(prod) {
            var deferred = $q.defer();
            console.log("Get producto con id:" + prod.id);
            Producto.getProducto({ id: prod.id }, {}, function (prod) {
                deferred.resolve(prod);
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

        this.crearProducto = function(producto) {
            var deferred = $q.defer();
            Producto.crearProducto({ id: producto.id }, producto, function (producto) {
                console.log("En Servicios creando producto con id: " + producto.id+ producto.nombre + producto.descripcion);
                deferred.resolve(producto);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.actualizarProducto = function(productos) {
            var deferred = $q.defer();
            Producto.actualizarProducto({}, productos , function (productos) {
                console.log("En Servicios actualizando producto con id: " + productos.id+ productos.nombre + productos.descripcion);
                deferred.resolve(productos);
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