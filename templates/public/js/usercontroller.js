angular.module('DemoApp').controller('usercontroller', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  '$rootScope',
  '$state',
  '$timeout',
  '$cookieStore',
  function($scope, $http, $stateParams, $location, $rootScope,$state, $timeout,$cookieStore) {
    
    $scope.userCookies = $cookieStore.get('userCookies') || {};
    //console.log("$scope.userCookies:",$scope.userCookies);
    
    $scope.init = function() {
      $scope.userCookies = $cookieStore.get('userCookies') || {};

    }

    /**
     @function addtodos
     @type post
     @author sameer Vedpathak
     @initialDate
     @lastDate
     */
    $scope.addtodos = function(data) {
      var tododata = {
        todo_data : data.todo_data,
        user_id: $scope.userCookies.userid
      }
      
      $http.post(baseUrl + 'addtodos',tododata).success(function(res, req) {
        $scope.gettodos();
        $state.go('welcomepage');
      }).error(function() {
        console.log("Connection Problem.");
      });
    }

    /**
     @function gettodo
     @type post
     @author sameer Vedpathak
     @initialDate
     @lastDate
     */
    $scope.gettododetails = function(data) {
      console.log("stateParams:",$stateParams.todo_id);
      var tododata = {
        todo_id: $stateParams.todo_id
      }
      $http.post(baseUrl + 'gettododetails',tododata).success(function(res, req) {
        console.log("res in gettododetails:",res);
        $scope.data = res.record[0];
      }).error(function() {
        console.log("Connection Problem.");
      });
    }

    //$scope.gettodo();
    /**
     @function gettodos
     @type post
     @author sameer Vedpathak
     @initialDate
     @lastDate
     */
    $scope.gettodos = function(data) {
      var tododata = {
        user_id: $scope.userCookies.userid
      }
      $http.post(baseUrl + 'gettodos',tododata).success(function(res, req) {
        $scope.todolist = res.record;
        console.log("todolist:", $scope.todolist);
      }).error(function() {
        console.log("Connection Problem.");
      });
    }  


   console.log("usercontroller");
  }
]);