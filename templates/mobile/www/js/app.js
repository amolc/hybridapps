// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic' ,'ngCordova','starter.controllers','starter.services','angular-storage','ngMessages','ionic-datepicker','ionic-timepicker'])



.run(function($ionicPlatform,$cordovaDevice,store) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }

    if(window.StatusBar) {
      StatusBar.styleDefault();
    }

      ionic.Platform.ready(function(){
    // will execute when device is ready, or immediately if the device is already ready.
      var currentPlatform = ionic.Platform.platform();
      var uuid = $cordovaDevice.getUUID();
      store.set('platform',currentPlatform);
      store.set('deviceid',uuid);
    
    });


    pushNotification = window.plugins.pushNotification;

      window.onNotification = function(e){

      console.log('notification received');
      switch(e.event){
        case 'registered':
          if(e.regid.length > 0){
            var device_token = e.regid;
            store.set('device_token',device_token);

          }
        break;

        case 'message':
          alert('msg received: ' + e.message);
            /*{
                "message": "Hello this is a push notification",
                "payload": {
                    "message": "Hello this is a push notification",
                    "sound": "solemn",
                    "title": "New Message",
                    "from": "419937285756",
                    "collapse_key": "do_not_collapse",
                    "foreground": true,
                    "event": "message"
                }
            };*/
          
        break;

        case 'error':
          alert('error occured');
        break;

      }



};

  //When an error occurs, user get an alert message.
  window.errorHandler = function(error){
    alert('an error occured');
  }

    pushNotification.register(
      onNotification,
      errorHandler,
      {
        'badge': 'true',
        'sound': 'true',
        'alert': 'true',
        'ecb': 'onNotification',
        'senderID': '419937285756',
      });

  });
    
})

.config(function($stateProvider, $urlRouterProvider , storeProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  
  // Store defaults to localStorage but we can set sessionStorage or cookieStorage.
  storeProvider.setStore('sessionStorage');


  $stateProvider

  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller:'logincontroller'
  })

  .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller:'logincontroller'
  })  

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    //controller:'logincontroller'
  })



  // Each tab has its own nav history stack:

  .state('tab.addreminder', {
    url: '/addreminder/:todo_id',
    views: {
      'tab-dash': {
        templateUrl: 'templates/add_reminder.html',
        controller: 'ReminderController'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('login');

})




