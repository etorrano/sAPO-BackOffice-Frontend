/**
 * Created by emi on 01/11/15.
 */
angular.module('sApobackOfficeFrontendApp')
.factory('ServicioAutenticacionAdmin', function() {
    var auth = {
        conectado: false
    }
    return auth;
})
.factory('ServicioUsuarioAdmin', function($http,REST_API) {
    var API_REST_URL = REST_API.BASE_URL;
    console.log("ServicioUsuarioAdmin");
    return {
        iniciarSesion: function(usuario, contrasenia) {
            console.log("Iniciar Sesion");
            return $http.post(API_REST_URL + '/login', {usuario: usuario, contrasenia: contrasenia});
        },
        cerrarSesion: function() {
            console.log("Cerrar Sesion");
        }
    }
});