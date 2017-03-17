'use strict';

/**
 * @ngdoc overview
 * @name sApobackOfficeFrontendApp
 * @description
 * # sApobackOfficeFrontendApp
 *
 * Main module of the application.
 */
angular
  .module('sApobackOfficeFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(["$routeProvider", function ($routeProvider) {
    $routeProvider
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
        .when('/phones', {
        templateUrl: 'views/productos.html',
        controller: 'prodCtrl'
      })
      /*  .when('/phones/:phoneId', {
        templateUrl: 'views/InfoProd.html',
        controller: 'prodDetCtrl'
      })*/
      .otherwise({
        redirectTo: '/phones'
      });
  }]);

'use strict';

/**
 * @ngdoc function
 * @name sApobackOfficeFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sApobackOfficeFrontendApp
 */
angular.module('sApobackOfficeFrontendApp')
  .controller('MainCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

'use strict';

/**
 * @ngdoc function
 * @name sApobackOfficeFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the sApobackOfficeFrontendApp
 */
angular.module('sApobackOfficeFrontendApp')
  .controller('AboutCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .controller('prodCtrl', ['$scope', 'productos',
        function($scope, productos) {
            $scope.phones = productos.getProductos();
        }]);



/**
 * Created by emi on 06/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
    .controller('prodDetCtrl', ['$scope', '$routeParams', 'Phone',
        function($scope, $routeParams, $http) {
            $http.get('productos/' + $routeParams.phoneId + '.json').success(function(data) {
                $scope.phone = data;
            });
        }]);

'use strict';

/* Services */
/*
var ServiciosSAPO = angular.module('sApobackOfficeFrontendApp', ['ngResource']);

ServiciosSAPO.factory('User', function($resource) {
    var User = $resource('https://sapo.azure-api.net/sapo/productos', { }, {
        query: {
            method: 'GET',
            isArray: true,
            headers: {
                        'Ocp-Apim-Subscription-Key': '9f86432ae415401db0383f63ce64c4fe',
                        'Content-Type':'application/json'
                     }
        }
    });
    return User
});*/
var ServiciosSAPO = angular.module('sApobackOfficeFrontendApp');
ServiciosSAPO.factory('productos', ['$http', function($http) {

        var urlBase = 'https://sapo.azure-api.net/sapo/productos';
        var dataFactory = {};

        dataFactory.getProductos = function () {
            return $http.get(
                urlBase,{
                headers: {
                    'Ocp-Apim-Subscription-Key': '9f86432ae415401db0383f63ce64c4fe',
                    'Content-Type':'application/json'
                }
            });
        };
    return dataFactory;
}]);
/*
ServiciosSAPO.factory('productos', ['$resource',
  function($resource){
    var Project = $resource('https://sapo.azure-api.net/sapo/productos',{},
            {

                          method: 'GET',
                          headers:{
                                    'Ocp-Apim-Subscription-Key': '9f86432ae415401db0383f63ce64c4fe',
                                    'Content-Type':'application/json'
                                   },
                          params: {phoneId:'phones'},
                          isArray:true

            });
   return Project;
 }]);*/

/*
      get:function(params, success, error) {

        var res = $resource( 'https://sapo.azure-api.net/sapo/productos/:id', null, {
          'get' : {
            method: 'GET',
            headers: {'Ocp-Apim-Subscription-Key': '9f86432ae415401db0383f63ce64c4fe'},
            params: {phoneId: 'productos'}
          }
        });
        return res.get({id:params.id}, success, error);
      }
    };
    return Productos;
  }]);*/


angular.module('sApobackOfficeFrontendApp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('views/InfoAlmacen.html',
    "<div class=\"phone-images\"> <img ng-src=\"{{img}}\" class=\"phone\" ng-repeat=\"img in phone.images\" ng-class=\"{active: mainImageUrl==img}\"> </div> <h1>{{phone.name}}</h1> <p>{{phone.description}}</p> <ul class=\"phone-thumbs\"> <li ng-repeat=\"img in phone.images\"> <img ng-src=\"{{img}}\" ng-click=\"setImage(img)\"> </li> </ul> <ul class=\"specs\"> <li> <span>Availability and Networks</span> <dl> <dt>Availability</dt> <dd ng-repeat=\"availability in phone.availability\">{{availability}}</dd> </dl> </li> <li> <span>Battery</span> <dl> <dt>Type</dt> <dd>{{phone.battery.type}}</dd> <dt>Talk Time</dt> <dd>{{phone.battery.talkTime}}</dd> <dt>Standby time (max)</dt> <dd>{{phone.battery.standbyTime}}</dd> </dl> </li> <li> <span>Storage and Memory</span> <dl> <dt>RAM</dt> <dd>{{phone.storage.ram}}</dd> <dt>Internal Storage</dt> <dd>{{phone.storage.flash}}</dd> </dl> </li> <li> <span>Connectivity</span> <dl> <dt>Network Support</dt> <dd>{{phone.connectivity.cell}}</dd> <dt>WiFi</dt> <dd>{{phone.connectivity.wifi}}</dd> <dt>Bluetooth</dt> <dd>{{phone.connectivity.bluetooth}}</dd> <dt>Infrared</dt> <dd>{{phone.connectivity.infrared | checkmark}}</dd> <dt>GPS</dt> <dd>{{phone.connectivity.gps | checkmark}}</dd> </dl> </li> <li> <span>Android</span> <dl> <dt>OS Version</dt> <dd>{{phone.android.os}}</dd> <dt>UI</dt> <dd>{{phone.android.ui}}</dd> </dl> </li> <li> <span>Size and Weight</span> <dl> <dt>Dimensions</dt> <dd ng-repeat=\"dim in phone.sizeAndWeight.dimensions\">{{dim}}</dd> <dt>Weight</dt> <dd>{{phone.sizeAndWeight.weight}}</dd> </dl> </li> <li> <span>Display</span> <dl> <dt>Screen size</dt> <dd>{{phone.display.screenSize}}</dd> <dt>Screen resolution</dt> <dd>{{phone.display.screenResolution}}</dd> <dt>Touch screen</dt> <dd>{{phone.display.touchScreen | checkmark}}</dd> </dl> </li> <li> <span>Hardware</span> <dl> <dt>CPU</dt> <dd>{{phone.hardware.cpu}}</dd> <dt>USB</dt> <dd>{{phone.hardware.usb}}</dd> <dt>Audio / headphone jack</dt> <dd>{{phone.hardware.audioJack}}</dd> <dt>FM Radio</dt> <dd>{{phone.hardware.fmRadio | checkmark}}</dd> <dt>Accelerometer</dt> <dd>{{phone.hardware.accelerometer | checkmark}}</dd> </dl> </li> <li> <span>Camera</span> <dl> <dt>Primary</dt> <dd>{{phone.camera.primary}}</dd> <dt>Features</dt> <dd>{{phone.camera.features.join(', ')}}</dd> </dl> </li> <li> <span>Additional Features</span> <dd>{{phone.additionalFeatures}}</dd> </li> </ul>"
  );


  $templateCache.put('views/InfoProd.html',
    "<div class=\"phone-images\"> <img ng-src=\"{{img}}\" class=\"phone\" ng-repeat=\"img in phone.images\" ng-class=\"{active: mainImageUrl==img}\"> </div> <h1>{{phone.name}}</h1> <p>{{phone.description}}</p> <ul class=\"phone-thumbs\"> <li ng-repeat=\"img in phone.images\"> <img ng-src=\"{{img}}\" ng-click=\"setImage(img)\"> </li> </ul> <ul class=\"specs\"> <li> <span>Availability and Networks</span> <dl> <dt>Availability</dt> <dd ng-repeat=\"availability in phone.availability\">{{availability}}</dd> </dl> </li> <li> <span>Battery</span> <dl> <dt>Type</dt> <dd>{{phone.battery.type}}</dd> <dt>Talk Time</dt> <dd>{{phone.battery.talkTime}}</dd> <dt>Standby time (max)</dt> <dd>{{phone.battery.standbyTime}}</dd> </dl> </li> <li> <span>Storage and Memory</span> <dl> <dt>RAM</dt> <dd>{{phone.storage.ram}}</dd> <dt>Internal Storage</dt> <dd>{{phone.storage.flash}}</dd> </dl> </li> <li> <span>Connectivity</span> <dl> <dt>Network Support</dt> <dd>{{phone.connectivity.cell}}</dd> <dt>WiFi</dt> <dd>{{phone.connectivity.wifi}}</dd> <dt>Bluetooth</dt> <dd>{{phone.connectivity.bluetooth}}</dd> <dt>Infrared</dt> <dd>{{phone.connectivity.infrared | checkmark}}</dd> <dt>GPS</dt> <dd>{{phone.connectivity.gps | checkmark}}</dd> </dl> </li> <li> <span>Android</span> <dl> <dt>OS Version</dt> <dd>{{phone.android.os}}</dd> <dt>UI</dt> <dd>{{phone.android.ui}}</dd> </dl> </li> <li> <span>Size and Weight</span> <dl> <dt>Dimensions</dt> <dd ng-repeat=\"dim in phone.sizeAndWeight.dimensions\">{{dim}}</dd> <dt>Weight</dt> <dd>{{phone.sizeAndWeight.weight}}</dd> </dl> </li> <li> <span>Display</span> <dl> <dt>Screen size</dt> <dd>{{phone.display.screenSize}}</dd> <dt>Screen resolution</dt> <dd>{{phone.display.screenResolution}}</dd> <dt>Touch screen</dt> <dd>{{phone.display.touchScreen | checkmark}}</dd> </dl> </li> <li> <span>Hardware</span> <dl> <dt>CPU</dt> <dd>{{phone.hardware.cpu}}</dd> <dt>USB</dt> <dd>{{phone.hardware.usb}}</dd> <dt>Audio / headphone jack</dt> <dd>{{phone.hardware.audioJack}}</dd> <dt>FM Radio</dt> <dd>{{phone.hardware.fmRadio | checkmark}}</dd> <dt>Accelerometer</dt> <dd>{{phone.hardware.accelerometer | checkmark}}</dd> </dl> </li> <li> <span>Camera</span> <dl> <dt>Primary</dt> <dd>{{phone.camera.primary}}</dd> <dt>Features</dt> <dd>{{phone.camera.features.join(', ')}}</dd> </dl> </li> <li> <span>Additional Features</span> <dd>{{phone.additionalFeatures}}</dd> </li> </ul>"
  );


  $templateCache.put('views/about.html',
    "<p>This is the about view.</p>"
  );


  $templateCache.put('views/copia%20de%20productos.html',
    "<div class=\"container-fluid\"> <div class=\"row\"> <div class=\"col-md-2\"> <!--Sidebar content--> Search: <input ng-model=\"query\"> Sort by: <select ng-model=\"orderProp\"> <option value=\"name\">Alphabetical</option> <option value=\"age\">Newest</option> </select> </div> <div class=\"col-md-10\"> <!--Body content--> <ul class=\"phones\"> <li ng-repeat=\"phone in phones | filter:query | orderBy:orderProp\" class=\"thumbnail\"> <a href=\"#/phones/{{phone.id}}\" class=\"thumb\"><img ng-src=\"{{phone.imageUrl}}\"></a> <a href=\"#/phones/{{phone.id}}\">{{phone.name}}</a> <p>{{phone.snippet}}</p> </li> </ul> </div> </div> </div>"
  );


  $templateCache.put('views/main.html',
    "<div class=\"jumbotron\"> <h1>'Allo, 'Allo!</h1> <p class=\"lead\"> <img src=\"images/yeoman.png\" alt=\"I'm Yeoman\"><br> Always a pleasure scaffolding your apps. </p> <p><a class=\"btn btn-lg btn-success\" ng-href=\"#/\">Splendid!<span class=\"glyphicon glyphicon-ok\"></span></a></p> </div> <div class=\"row marketing\"> <h4>HTML5 Boilerplate</h4> <p> HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites. </p> <h4>Angular</h4> <p> AngularJS is a toolset for building the framework most suited to your application development. </p> <h4>Karma</h4> <p>Spectacular Test Runner for JavaScript.</p> </div>"
  );


  $templateCache.put('views/productos.html',
    "<div class=\"container-fluid\"> <div class=\"row\"> <div class=\"col-md-2\"> <!--Sidebar content--> Search: <input ng-model=\"query\"> Sort by: <select ng-model=\"orderProp\"> <option value=\"name\">Alphabetical</option> <option value=\"age\">Newest</option> </select> </div> <div class=\"col-md-10\"> <!--Body content--> <ul class=\"phones\"> <li ng-repeat=\"phone in phones | filter:query\" class=\"thumbnail\"> <p>{{phone.id}}</p> </li> </ul> </div> </div> </div>"
  );

}]);
