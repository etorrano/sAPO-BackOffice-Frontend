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
.factory('ServicioUsuarioAdmin', function ($http,REST_API){
    var API_REST_URL = REST_API.BASE_URL;
    var administrador = {nombre: 'nada'};
    console.log("ServicioUsuarioAdmin");
    return {
        iniciarSesion: function(usuario, contrasenia) {
            console.log("Iniciar Sesion");
            return $http.post(API_REST_URL + '/administradores/login', {user: usuario, password: contrasenia});
        },
        cerrarSesion: function() {
            console.log("Cerrar Sesion");
        },
        get: function() {
          console.log("Obtengo administrador:" + administrador.nombre);
            return administrador;
        },
        set: function(admin) {
          console.log("Guardo administrador: " + admin.nombre);
            administrador = admin;
        }
    }
});
