//this is angular js app to send data between frontend(go) and backend(nodejs)
var app = angular.module('myApp', ['ngSanitize']);
app.controller("compile", function($scope, $http) {
    $scope.new_data = function() {

        $http.post('http://localhost:3000/onfer/', $scope.formdata).then(function(response) {
            
            //redirect
            location.replace("http://localhost:8000/compiled");
        });
    }
});

