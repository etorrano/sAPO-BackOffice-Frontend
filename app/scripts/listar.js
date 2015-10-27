/**
 * Created by emi on 26/10/15.
 */
angular.module('sApobackOfficeFrontendApp')
.service('dataService', ['$http','$q', function($http, $q)
{
    var obj = {},
        deferred = $q.defer(),
        apiUrl = "http://localhost/php/slimrest/books";
    obj.get = function()
    {
        $http.get(apiUrl)
            .success(function(data, status, headers, config)
            {
                deferred.resolve(data, status, headers, config);
            })
            .error(function(data, status, headers, config)
            {
                deferred.reject(data, status, headers, config);
            });
        return deferred.promise;
    }
    return obj;
}])

.controller('paginationCtrl', function($scope, $filter, ngTableParams, ServicioCategoria)
{   var categorias = [];
    ServicioCategoria.getCategorias().then(function(results)
    {
        categorias = results;
       /* angular.forEach(results, function(categoria) {
            categorias = results;
        });*/
        $scope.tableParams = new ngTableParams(
            {
                page: 1,          // primera página a mostrar
                count: 2          // registros por página
            },
            {
                total: results.length, // resultados en total
                getData: function($defer, params)
                {
                    $defer.resolve(results.slice((params.page() - 1) * params.count(), params.page() * params.count()));
                }
            }
        );
    });

    $scope.checkboxes = { 'checked': false, items: {} };

    // watch for check all checkbox
    $scope.$watch('checkboxes.checked', function(value) {
        angular.forEach($scope.orderedData, function(item) {
            if (angular.isDefined(item.id)) {
                $scope.checkboxes.items[item.id] = value;
            }
        });
    });

    // watch for data checkboxes
    $scope.$watch('checkboxes.items', function(values) {
        if (!$scope.book) {
            return;
        }
        var checked = 0, unchecked = 0,
            total = $scope.book.length;
        angular.forEach($scope.book, function(item) {
            checked   +=  ($scope.checkboxes.items[item.id]) || 0;
            unchecked += (!$scope.checkboxes.items[item.id]) || 0;
        });
        if ((unchecked == 0) || (checked == 0)) {
            $scope.checkboxes.checked = (checked == total);
        }
        // grayed checkbox
        angular.element(document.getElementById("select_all")).prop("indeterminate", (checked != 0 && unchecked != 0));
    }, true);
/*
    $scope.seleccionar = function () {
        $scope.seleccionados = $filter('filter')($scope.books, {checked: true});
        console.log("seleccionado "+ $scope.seleccionados);
    }*/
    $scope.continuar = function()
    {
        var cats=[];
        // loop through all checkboxes
        angular.forEach(categorias, function(item, key) {
            console.log("Verificar categorias seleccionadas");
            if($scope.checkboxes.items[item.id]) {
                console.log("seleccionado "+ item.id + item);
                cats.push(item); // push checked items to array
            }
        });
        $scope.cats=cats;
       /* var cats=[];
        angular.forEach($scope.checkboxes.items, function(item) {

            console.log("En listar item " + item);
            console.log("En listar id item " + $scope.checkboxes.items.indexOf(item));
            cats.push($scope.books[$scope.checkboxes.indexOf(item)]);
        });*/
       // console.log(cats);
    }
})


.controller('editCtrl', function($scope, ngTableParams, ServicioCategoria)
{
    ServicioCategoria.getCategorias().then(function(results)
    {
        $scope.tableParams = new ngTableParams({
            page: 1,          // primera página a mostrar
            count: 2          // registros por página
        }, {
            total: results.length, // resultados en total
            getData: function($defer, params)
            {
                $defer.resolve(results.slice((params.page() - 1) * params.count(), params.page() * params.count()));
            }
        });
    });

    //aquí podemos actualizar el libro
    $scope.save = function(book)
    {
        console.log(book);
    }
});