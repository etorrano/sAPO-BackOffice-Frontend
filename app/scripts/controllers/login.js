/**
 * Created by emi on 01/11/15.
 */
angular.module('sApobackOfficeFrontendApp')
.controller('UsuarioAdminCtrl', ['$scope', 'DatosGlobales', '$location', '$window','Admin', 'ServicioUsuarioAdmin', 'ServicioAutenticacionAdmin','ServicioAdministrador',
    function UsuarioAdminCtrl($scope,DatosGlobales, $location, $window, Admin,ServicioUsuarioAdmin, ServicioAutenticacionAdmin, ServicioAdministrador) {
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
                    //ServicioProducto.getProducto('7').then(function(producto) {
                    ServicioAdministrador.get('leo').then(function(producto) {
                        ServicioUsuarioAdmin.set(producto);
                        Admin = producto;
                        DatosGlobales.admin = producto;
                       // ServicioAutenticacionAdmin.admin = producto;
                      //  $scope.$parent.administrador = producto;
                    //  console.log("prod: " + DatosGlobales.admin);
                     //   console.log("Guardando prod: " + Admin.nombre);
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
