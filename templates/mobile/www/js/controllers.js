angular.module('starter.controllers', [])

.controller('ReminderController', function($scope, $http, $state, store ,$stateParams,$location) {

  $scope.init = function() {
    $scope.usersession = store.get('userDetail') || {};
     $scope.getreminders();

     if($stateParams){
      $scope.stateParams = $stateParams.todo_id;
      $scope.getreminderdetails($stateParams); 
     }else{
      $scope.reminder = {
        todo_id : '',
        todo_data : ""
      };
     }  
  }

  /**
    @function for addUpdateTodos
    @param {int} first - todo_id
    @author sameer vedpathak
    @initialDate
    @lastDate
  */
 
    $scope.addUpdateReminder = function(reminder) {
      if ($stateParams.todo_id)
        $scope.updateReminder(reminder);
      if ($stateParams.todo_id == '')
        $scope.addReminder(reminder);
    };

  /**
   @function addReminder
   @type post
   @author sameer Vedpathak
   @initialDate
   @lastDate
  */
    $scope.addReminder = function(reminder) {
      console.log("todo_data:",reminder);
      $scope.reminder_data = {
        todo_data : reminder.todo_data,
        user_id: $scope.usersession.userid
      }
      $http.post(baseUrl + 'addtodos',$scope.reminder_data).success(function(res, req) {
      if(res.status == true){
        console.log("Reminder Added Successfully");
        $scope.reminder_data = {
          todo_data : "",
          user_id :null
        }
        $scope.getreminders();
        $location.path('/tab/addreminder/');
      }else{
         console.log("Reminder Failes to Add");
      }
      }).error(function() {
        console.log("Connection Problem.");
      });
    }

  /**
   @function updateReminder
   @type post
   @author sameer Vedpathak
   @initialDate
   @lastDate
  */
  
    $scope.updateReminder = function(reminder) {
      var tododata = {
        todo_data : reminder.todo_data,
        todo_id: $stateParams.todo_id
      }
      $http.post(baseUrl + 'updatetodos',tododata).success(function(res, req) {
        if(res.status == true){
          console.log("Reminder Successfully Updated");
          $scope.getreminders();
          $location.path('/tab/addreminder/' + $stateParams.todo_id);
          
        }else{
          console.log("Reminder Failed To Update");
        }
      }).error(function() {
        console.log("Connection Problem.");
      });
    }


   /**
     @function getreminders
     @type post
     @author sameer Vedpathak
     @initialDate
     @lastDate
   */
    $scope.getreminders = function() {
      var reminderdata = {
        user_id: $scope.usersession.userid
      }
      $http.post(baseUrl + 'gettodos',reminderdata).success(function(res, req) {
        $scope.reminderlist = res.record;
      }).error(function() {
        console.log("Connection Problem.");
      });
    }

  /**
   @function getreminderdetails
   @type post
   @author sameer Vedpathak
   @initialDate
   @lastDate
  */
    $scope.getreminderdetails = function() {
      var tododata = {
        todo_id: $stateParams.todo_id
      }
      $http.post(baseUrl + 'gettododetails',tododata).success(function(res, req) {
        $scope.reminder = res.record[0];
      }).error(function() {
        console.log("Connection Problem.");
      });
    }

  /**
    @function deleteReminder
    @type post
    @author 
    @initialDate
    @lastDate
  */
    $scope.deleteReminder = function(reminder) {
      var reminderdata = {
        todo_id:reminder.todo_id
      }
      $http.post(baseUrl + 'deletetodo', reminderdata).success(function(res, req) {
         if( res.status == true ){
            // Remove the reminder from the reminderlist list
            for (var i in $scope.reminderlist) {
                if ($scope.reminderlist[i] == reminder) {
                    $scope.reminderlist.splice(i, 1);
                }
            }
            console.log("record deleted");
            $scope.getreminders();
          } else if(res.status === false){
            console.log("Failed To delete Reminder");
          }
      }).error(function() {
        console.log("Connection Problem.");
      });
    };  

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
