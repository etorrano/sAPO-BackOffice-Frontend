/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .service('ServicioCategoria', ['$q', 'Categoria', function ($q, Categoria) {

        this.init = function () {};
        console.log("En ServicioCategoria");
        this.getCategoria = function(id) {
            var deferred = $q.defer();
            console.log("Get categoria con id:" + id);
            Categoria.getCategoria({ id: id }, {}, function (categoria) {
                deferred.resolve(categoria);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.getCategorias = function() {
            console.log("Obtener categorias(get)");
            var deferred = $q.defer();
            Categoria.getCategorias({}, {}, function (categorias) {
                console.log(categorias);
                deferred.resolve(categorias);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.crearCategoria = function(categoria) {
            var deferred = $q.defer();
            console.log("En Servicios creando categoria con datos: " + categoria.nombre + categoria.descripcion);
            Categoria.crearCategoria({}, categoria, function (categoria) {
               deferred.resolve(categoria);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.actualizarCategoria = function(categorias) {
            var deferred = $q.defer();
            Categoria.actualizarCategoria({}, categorias , function (categorias) {
                console.log("En Servicios actualizando categoria con id: " + categorias.id+ categorias.nombre + categorias.descripcion);
                deferred.resolve(categorias);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.eliminarCategoria = function(id) {
            var deferred = $q.defer();
            Categoria.eliminarCategoria({ id: id }, {}, function (id) {
                deferred.resolve(id);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }]);