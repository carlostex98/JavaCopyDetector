//this is angular js app to send data between frontend(go) and backend(nodejs)
var app = angular.module('myApp', []);
app.controller("compile", function ($scope, $http) {
    $scope.new_data = function () {
        
        $http.post('http://localhost:3000/onfer/', $scope.formdata
        ).then(function (response) {
            alert(response.data);
            //redirect
        });
    }
});

app.controller('result_set', function ($scope, $http) {
    $http.get("http://localhost:3000/fmx/")
        .then(function (response) {
            //ponemos la onda jaja
            //el arbol ya viene renderizado
            //se renderizan los errores y las variables
            $scope.errores=response.data.errores;
            
        });
});