//this is angular js app to send data between frontend(go) and backend(nodejs)
var app = angular.module('myApp', []);
app.controller("compile", function ($scope, $http) {
    $scope.new_data = function () {
        var form_data = new FormData();
        form_data.append('file1', $scope.archivo1);
        form_data.append('file2', $scope.correo);
        $http.post('http://localhost:8080/onfer/', form_data,
            {
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }
        ).then(function (response) {
            //alert(response.data);
            //redirect
        });
    }
});

app.controller('result_set', function ($scope, $http) {
    $http.get("http://localhost:8080/fmx/")
        .then(function (response) {
            //ponemos la onda jaja
            //el arbol ya viene renderizado
            //se renderizan los errores y las variables
            
        });
});