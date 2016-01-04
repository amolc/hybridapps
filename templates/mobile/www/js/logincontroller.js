angular.module('starter.controllers')

.controller('logincontroller', function($scope, $http, $state, store) {

	 $scope.init = function() {
      
      // This will look for obj in sessionStorage
      $scope.usersession = store.get('userDetail');
      console.log($scope.usersession);
   }

  
   /*
    @function userlogin
    @type post
    @author Sameer Vedpathak
    @initialDate 
    @lastDate
    **/
    $scope.userdetails = {
        user_email : '',
        user_password :''
      }

    $scope.userlogin = function(user) {
     
      $scope.userdetails = {
        user_email : user.email,
        user_password : user.password
      }
      $http.post(baseUrl + 'login', $scope.userdetails).success(function(res,req){

        var userDetail = {
          login:'true',
          userid: res.record[0].id,
          useremail: res.record[0].user_email,
          username:res.record[0].user_name
        };

         // This will be saved in sessionStorage as obj
        store.set('userDetail', userDetail);
        $scope.init(); 
        $state.go('tab.addreminder'); 
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
    

    $scope.usersignout = function() {
      store.remove('userDetail');
      $scope.usersession = store.get('userDetail');
      $scope.userdetails.user_email = '';
      $scope.userdetails.user_password = '';
      //console.log("$scope.userdetails:",$scope.userdetails);
      $scope.init();
      $state.go('login');
    };

})