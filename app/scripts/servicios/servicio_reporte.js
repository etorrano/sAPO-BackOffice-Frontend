/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .service('ServicioReporte', ['$q', 'Reporte', function ($q, Reporte) {

        this.init = function () {};
        console.log("En ServicioReporte");
        this.get = function(id) {
            var deferred = $q.defer();
            console.log("Get reporte con id:" + id);
            Reporte.get({ id: id }, {}, function (reporte) {
                deferred.resolve(reporte);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.getLista = function() {
            console.log("Obtener reportes(get)");
            var deferred = $q.defer();
            Reporte.getLista({}, {}, function (reportes) {
                console.log(reportes);
                deferred.resolve(reportes);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.crear = function(reporte) {
            var deferred = $q.defer();
            console.log("En Servicios creando reporte con datos: " + reporte.nombre + reporte.descripcion);
            Reporte.crear({}, reporte, function (reporte) {
               deferred.resolve(reporte);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.actualizar= function(reportes) {
            var deferred = $q.defer();
            Reporte.actualizar({}, reportes , function (reportes) {
                console.log("En Servicios actualizando reporte con id: " + reportes.id+ reportes.nombre + reportes.descripcion);
                deferred.resolve(reportes);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.eliminar = function(id) {
            var deferred = $q.defer();
            Reporte.eliminar({ id: id }, {}, function (id) {
                deferred.resolve(id);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }]);
