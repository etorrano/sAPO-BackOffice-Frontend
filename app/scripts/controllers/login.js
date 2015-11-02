/**
 * Created by emi on 01/11/15.
 */
angular.module('sApobackOfficeFrontendApp')
.controller('UsuarioAdminCtrl', ['$scope', '$location', '$window', 'ServicioUsuarioAdmin', 'ServicioAutenticacionAdmin',
    function UsuarioAdminCtrl($scope, $location, $window, ServicioUsuarioAdmin, ServicioAutenticacionAdmin) {
        console.log("Controlador UsuarioAdminCtrl");
        //Admin User Controller (login, logout)
        $scope.iniciarSesion = function iniciarSesion(usuario, contrasenia) {
            console.log("Login: " +usuario+contrasenia);
/*            ServicioAutenticacionAdmin.conectado = true;
            $location.path("/");*/
            if (usuario !== undefined && contrasenia !== undefined) {

                ServicioUsuarioAdmin.iniciarSesion(usuario, contrasenia).success(function(data) {
                    ServicioAutenticacionAdmin.conectado = true;
                    $window.sessionStorage.token = data.token;
                    $location.path("/");
                }).error(function(status, data) {
                    console.log(status);
                    console.log(data);
                });
            }
        }

        $scope.cerrarSesion = function cerrarSesion() {
            console.log("cerrarSesion");
            if (ServicioAutenticacionAdmin.conectado) {
                ServicioAutenticacionAdmin.conectado = false;
                delete $window.sessionStorage.token;
                $location.path("/");
            }
        }
    }
]);