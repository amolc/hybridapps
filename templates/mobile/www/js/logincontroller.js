angular.module('starter.controllers')

.controller('logincontroller', function($scope, $http, $state, store , $location , $window, $timeout) {

	 $scope.init = function() {
      
      // This will look for obj in sessionStorage
      $scope.usersession = store.get('userDetail') || {} ;
     console.log($scope.usersession);
   }

   /*
    @function userlogin
    @type post
    @author Sameer Vedpathak
    @initialDate 
    @lastDate
    **/
    $scope.data = {
      user_email: '' ,
      user_password:''
    };

    $scope.userlogin = function(data,valid) {
      console.log("valid:",valid);
      if(valid){
        $scope.data = angular.copy(data);
        $http.post(baseUrl + 'login', $scope.data).success(function(res,req){
            if(res.status == true){
              var userDetail = {
                login:'true',
                userid: res.record[0].id,
                useremail: res.record[0].user_email,
                username:res.record[0].user_name
              };
              store.set('userDetail', userDetail);
              $scope.init(); 
              $state.go('tab.addreminder'); 
            }else{
              console.log("res",res);
              $scope.loginerrormsg = 'Invalid Email Id and Password Combination';
              $scope.showloginerrormsg = true;
              // Simulate 2 seconds loading delay
              $timeout(function() {
                // Loadind done here - Show message for 3 more seconds.
                $timeout(function() {
                  $scope.showloginerrormsg = false;
                }, 3000);
              }, 2000);
            }
        }).error(function(){
          console.log("Connection Problem..");
        });
      }
    };

    /**
      @function usersignout
      @author Sameer Vedpathak
      @initialDate 
      @lastDate
    */
   
    $scope.usersignout = function() {
      store.remove('userDetail');
      $scope.data.user_email = "";
      $scope.data.user_password = "";
      $window.location.reload(true)
      $location.path('/login')
    };

})