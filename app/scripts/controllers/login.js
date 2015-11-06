/**
 * Created by emi on 01/11/15.
 */
angular.module('sApobackOfficeFrontendApp')
.controller('UsuarioAdminCtrl', ['$scope', '$location', '$window','Admin', 'ServicioUsuarioAdmin', 'ServicioAutenticacionAdmin','ServicioProducto',
    function UsuarioAdminCtrl($scope, $location, $window, Admin,ServicioUsuarioAdmin, ServicioAutenticacionAdmin, ServicioProducto) {
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
                    ServicioProducto.getProducto('7').then(function(producto) {
                        ServicioUsuarioAdmin.set(producto);
                        Admin = producto;
                      //  $scope.$parent.admnistrador = producto;
                        console.log("Guardando prod: " + Admin.nombre);
                    });
                    //var producto = ServicioProducto.getProducto('7');
                    //ServicioUsuarioAdmin.set(producto);
                    //ServicioUsuarioAdmin.usuario = ServicioAdministrador.get(usuario);
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
