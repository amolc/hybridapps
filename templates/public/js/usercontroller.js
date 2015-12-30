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
    
    
    $scope.init = function() {
      $scope.userCookies = $cookieStore.get('userCookies') || {};

    }
      $scope.stateParams = $stateParams.todo_id;
    /**
      @function for addUpdateTodos
      @param {int} first - todo_id
      @author sameer vedpathak
      @initialDate
      @lastDate
    */
   
    $scope.addUpdateTodos = function(data) {
      if ($stateParams.todo_id)
        $scope.updatetodos(data);
      if ($stateParams.todo_id == '')
        $scope.addtodos(data);
    };

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
     @function updatetodos
     @type post
     @author sameer Vedpathak
     @initialDate
     @lastDate
     */
    $scope.updatetodos = function(data) {
      var tododata = {
        todo_data : data.todo_data,
       todo_id: $stateParams.todo_id
      }
      $http.post(baseUrl + 'updatetodos',tododata).success(function(res, req) {
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
      var tododata = {
        todo_id: $stateParams.todo_id
      }
      $http.post(baseUrl + 'gettododetails',tododata).success(function(res, req) {
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
      }).error(function() {
        console.log("Connection Problem.");
      });
    }

    /**
    @function deletetodo
    @type post
    @author 
    @initialDate
    @lastDate
    */
    $scope.deletetodo = function(data) {
      var data = {
        todo_id:data.todo_id
      }
      $http.post(baseUrl + 'deletetodo', data).success(function(res, req) {
         if( res.status == true ){
            // Remove the todo from the todos list
            for (var i in $scope.todolist) {
                if ($scope.todolist[i] == data) {
                    $scope.todolist.splice(i, 1);
                }
            }
            $scope.gettodos();
            $state.go('welcomepage');
          } else if(res.status === false){
            $scope.message = "failed to delete todo ";
          }
      }).error(function() {
        console.log("Connection Problem.");
      });
    };  


  }
]);