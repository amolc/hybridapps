angular.module('starter.controllers', [])

.controller('ReminderController', function($scope, $http, $state, store) {

     $scope.init = function() {
      // This will look for obj in sessionStorage
      $scope.usersession = store.get('userDetail') || {};
      console.log($scope.usersession);
      
      
   }

   /**
      @function usersignout
      @author Sameer Vedpathak
      @initialDate 
      @lastDate
    */
    /*$scope.usersignout = function() {
      $scope.init();
      console.log("calling sign out function");
      store.remove('userDetail');
      $state.go('login');
      
    };*/

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
