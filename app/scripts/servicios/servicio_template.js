/**
 * Created by emi on 08/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .service('ServicioTemplate', ['$q', 'Template', function ($q, Template) {

        this.init = function () {};
        console.log("En ServicioTemplate");
        this.getTemplate = function(prod) {
            var deferred = $q.defer();
            console.log("Get template con id:" + prod.id);
            Template.getTemplate({ id: prod.id }, {}, function (prod) {
                deferred.resolve(prod);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.getTemplates = function() {
            console.log("Obtener templates(get)");
            var deferred = $q.defer();
            Template.getTemplates({}, {}, function (templates) {
                console.log(templates);
                deferred.resolve(templates);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.crearTemplate = function(template) {
            var deferred = $q.defer();
            console.log("En Servicios creando template con datos: " + template.nombre + template.descripcion);
            Template.crearTemplate({}, template, function (template) {
               deferred.resolve(template);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.actualizarTemplate = function(templates) {
            var deferred = $q.defer();
            Template.actualizarTemplate({}, templates , function (templates) {
                console.log("En Servicios actualizando template con id: " + templates.id+ templates.nombre + templates.descripcion);
                deferred.resolve(templates);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        this.eliminarTemplate = function(id) {
            var deferred = $q.defer();
            Template.eliminarTemplate({ id: id }, {}, function (id) {
                deferred.resolve(id);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

    }]);