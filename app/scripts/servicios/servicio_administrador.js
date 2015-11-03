/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .service('ServicioAdministrador', ['$q', 'Administrador', function ($q, Administrador) {

        this.init = function () {};
        console.log("En ServicioAdministrador");
        this.get = function(prod) {
            var deferred = $q.defer();
            console.log("Get administrador con id:" + prod.id);
            Administrador.get({ id: prod.id }, {}, function (prod) {
                deferred.resolve(prod);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.getLista = function() {
            console.log("Obtener administradores(get)");
            var deferred = $q.defer();
            Administrador.getLista({}, {}, function (administradores) {
                console.log(administradores);
                deferred.resolve(administradores);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.crear = function(administrador) {
            var deferred = $q.defer();
            console.log("En Servicios creando administrador con datos: " + administrador.nombre + administrador.descripcion);
            Administrador.crear({}, administrador, function (administrador) {
               deferred.resolve(administrador);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.actualizar= function(administradores) {
            var deferred = $q.defer();
            Administrador.actualizar({}, administradores , function (administradores) {
                console.log("En Servicios actualizando administrador con id: " + administradores.id+ administradores.nombre + administradores.descripcion);
                deferred.resolve(administradores);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.eliminar = function(id) {
            var deferred = $q.defer();
            Administrador.eliminar({ id: id }, {}, function (id) {
                deferred.resolve(id);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }]);