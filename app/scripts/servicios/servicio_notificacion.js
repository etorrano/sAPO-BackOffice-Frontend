/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .service('ServicioNotificacion', ['$q', 'Notificacion', function ($q, Notificacion) {

        this.init = function () {};
        console.log("En ServicioNotificacion");
        this.get = function(prod) {
            var deferred = $q.defer();
            console.log("Get notificacion con id:" + prod.id);
            Notificacion.get({ id: prod.id }, {}, function (prod) {
                deferred.resolve(prod);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.getLista = function() {
            console.log("Obtener notificaciones(get)");
            var deferred = $q.defer();
            Notificacion.getLista({}, {}, function (notificaciones) {
                console.log(notificaciones);
                deferred.resolve(notificaciones);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.crear = function(notificacion) {
            var deferred = $q.defer();
            console.log("En Servicios creando notificacion con datos: " + notificacion.nombre + notificacion.descripcion);
            Notificacion.crear({}, notificacion, function (notificacion) {
               deferred.resolve(notificacion);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.actualizar= function(notificaciones) {
            var deferred = $q.defer();
            Notificacion.actualizar({}, notificaciones , function (notificaciones) {
                console.log("En Servicios actualizando notificacion con id: " + notificaciones.id+ notificaciones.nombre + notificaciones.descripcion);
                deferred.resolve(notificaciones);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.eliminar = function(id) {
            var deferred = $q.defer();
            Notificacion.eliminar({ id: id }, {}, function (id) {
                deferred.resolve(id);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }]);