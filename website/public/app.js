var app = angular.module("myApp", []);

// page controller
app.controller('pageController', ['$scope', '$interval', '$http', function ($scope, $interval, $http) {
    $interval(function () {
        $http({
            method: 'GET',
            url: '/favors'
        }).then(function successCallback(data) {
            var arr = [];
            var favs = data.data.favors;

            for (var name in favs) {
                if (favs.hasOwnProperty(name)) {
                    var favor = favs[name];

                    arr.push({
                        "name": name,
                        "favor": favor
                    });
                }
            }

            $scope.favors = arr;
        }, function errorCallback(response) {
            console.log(response);
        });
    }, 3000);

    $scope.favors = [];
}]);

