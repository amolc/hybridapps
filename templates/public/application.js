// Invoke 'strict' JavaScript mode
'use strict';

// Set the main application name
var ApplicationModuleName = 'DemoApp';


// Create the main application
var SampleApplicationModule = angular.module('DemoApp', ['ui.router','angular-storage']);

SampleApplicationModule.config(['$urlRouterProvider', '$stateProvider','storeProvider', function($urlRouterProvider, $stateProvider , storeProvider) {
  storeProvider.setStore('sessionStorage');
  $urlRouterProvider.otherwise('/signin');
  $stateProvider
    .state('signin', {
      url: '/signin',
      templateUrl: 'templates/signin.html'
    })

    $stateProvider
    .state('welcomepage', {
      url: '/welcomepage/:todo_id',
      templateUrl: 'templates/welcomepage.html'
    })

    /*$stateProvider
    .state('add_todos', {
      url: '/add_todos/:todo_id',
      templateUrl: 'templates/add_todos.html'
    })

    $stateProvider
    .state('listtodos', {
      url: '/listtodos',
      templateUrl: 'templates/list_todos.html'
    })*/
}]);


angular.module('DemoApp').controller('MainController', [
  '$scope',
  '$http',
  '$stateParams',
  '$location',
  '$rootScope',
  '$state',
  '$timeout',
  'store',
  function($scope, $http, $stateParams, $location, $rootScope,$state, $timeout,store) {

    $scope.init = function() {

      //$scope.userCookies = $cookieStore.get('userCookies') || {};
       $scope.userSession = store.get('userSession') || {};
    }

    /*
    @function userlogin
    @type post
    @author Sameer Vedpathak
    @initialDate 
    @lastDate
    **/

    $scope.userlogin = function(user) {
        $http.post(baseUrl + 'login',user).success(function(res, req) {
          if (res.status == true) {
            var userSession = {
              'login': true,
              'userid': res.record[0].id,
              'user_email': res.record[0].user_email,
              'user_name': res.record[0].user_name
            };
            store.set('userSession', userSession);
            //$cookieStore.put('userCookies', userCookies);
            console.log('userSession', userSession);
            $scope.init();
            $state.go('welcomepage');
          } else if (res.status === false) {
            console.log("login failed");
          }
        }).error(function() {
          console.log("Connection Problem.");
        });
    };

    /**
      @function usersignout
      @author Sameer Vedpathak
      @initialDate 
      @lastDate
    */
    $scope.usersignout = function() {
      //$cookieStore.remove('userCookies');
      //$location.path('signin');
      //$scope.userCookies.login = false;
      //$scope.init();
      store.remove('userSession');
      $location.path('signin');
      $scope.init();
    };
    
  }
]);
