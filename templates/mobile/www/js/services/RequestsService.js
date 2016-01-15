(function(){

    var device_token;
    
    angular.module('starter')
    .service('RequestsService', ['$http', '$q', '$ionicLoading',  RequestsService]);

    function RequestsService($http, $q, $ionicLoading){

        var baseUrl = 'http://node.fountaintechies.com:9999/api/';
        //var baseUrl = "http://locahost:9999/api/";
       // alert("RequestsService device_token:",device_token);
        function register(device_token){

            var deferred = $q.defer(); //run the function asynchronusly
            $ionicLoading.show(); //show the ionic loader animation
            //alert(device_token);
            //alert(register);
            //make a POST request to the /register patha amd submit the device_token as data
/*            $http.post(baseUrl + 'register', {'device_token': device_token})
                .success(function(response){

                    $ionicLoading.hide(); //hide the ionc loader
                    deferred.resolve(response);

                })
                .error(function(data){
                    deferred.reject();
                });


            return deferred.promise; //return the result once the POST request returns a response
*/

        };

        return {
            register: register
        };
    }
})();