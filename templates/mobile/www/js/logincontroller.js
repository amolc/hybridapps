angular.module('starter.controllers')

.controller('logincontroller', function($scope, $http, $state, store) {

	/*
    @function userlogin
    @type post
    @author Sameer Vedpathak
    @initialDate 
    @lastDate
    **/

    $scope.userlogin = function(user) {
      console.log("user:",user);
      var userdetails = {
        user_email : user.email,
        user_password : user.password
      }
  
      $http.post(baseUrl + 'login', userdetails).success(function(res,req){
        console.log("res:",res);
      }).error(function(){
        console.log("Connection Problem..");
      });
    };

    /**
      @function usersignout
      @author Sameer Vedpathak
      @initialDate 
      @lastDate
    */
    /*$scope.usersignout = function() {
      $cookieStore.remove('userCookies');
      $location.path('signin');
      $scope.userCookies.login = false;
      $scope.init();
    };*/

})