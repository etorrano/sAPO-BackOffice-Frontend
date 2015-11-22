/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .service('ServicioReporte', ['$q', 'Reporte', 'ReporteNodeJS', function ($q, Reporte,ReporteNodeJS) {

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

        this.obtenerRegistrados = function() {
            console.log("Obtener reportes(get)");
            var deferred = $q.defer();
            Reporte.obtenerRegistrados({}, {}, function (reportes) {
                console.log(reportes);
                deferred.resolve(reportes);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };


        this.obtenerTopGenericos = function(cantidad) {
            console.log("Obtener obtenerTopGenericos(get)");
            var deferred = $q.defer();
            Reporte.obtenerTopGenericos({productos: cantidad}, {}, function (reportes) {
                console.log(reportes);
                deferred.resolve(reportes);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.obtenerReportes = function(parametros) {
            console.log("Obtener obtenerReportes(get)");
            var deferred = $q.defer();
            Reporte.obtenerReportes(parametros, {}, function (reportes) {
                console.log(reportes);
                deferred.resolve(reportes);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };
        
        this.obtenerGanancias = function() {
            console.log("Obtener obtenerGanancias(get)");
            var deferred = $q.defer();
            Reporte.obtenerGanancias({}, {}, function (reportes) {
                console.log(reportes);
                deferred.resolve(reportes);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.obtenerRecomProductos = function() {
            console.log("Obtener obtenerRecomProductos(get)");
            var deferred = $q.defer();
            ReporteNodeJS.obtenerRecomProductos({}, {}, function (reportes) {
                console.log(reportes);
                deferred.resolve(reportes);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.movimientos = function() {
            console.log("Obtener movimientos(get)");
            var deferred = $q.defer();
            Reporte.movimientos({}, {}, function (reportes) {
                console.log(reportes);
                deferred.resolve(reportes);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.obtenerReporteMovimientos = function(dias) {
            console.log("Obtener obtenerRecomProductos(get)");
            var deferred = $q.defer();
            Reporte.obtenerReporteMovimientos({}, {dias: dias}, function (reportes) {
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
