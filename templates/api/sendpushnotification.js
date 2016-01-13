var express = require('express');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var SendNotification = CRUD(connection,'todos');
var deviceCrud  = CRUD(connection,'device_information');
var exports = module.exports = {};
var async = require("async");

exports.sendnotification = function(req,res){
            var gcm = require('node-gcm');
            var sender = new gcm.Sender('AIzaSyAJ9kNU7h4VSK2oiqrD5EatNVvzBD6zsxw');
            var message = new gcm.Message(); //create a new message

            message.addData('title', 'New Message');
            message.addData('sound', 'notification');

            message.collapseKey = 'testing'; //grouping messages
            message.delayWhileIdle = true; //delay sending while receiving device is offline
            message.timeToLive = 3000; //the number of seconds to keep the message on the server if the device is offline

            var userid = req.body.user_id;
            var registrationIds = [];
            var remidermessages = [];
          
          var query1 = "SELECT todo_id,todo_data,user_id,reminder_date,reminder_time,deviceid,platform,device_token FROM device_information JOIN todos ON device_information.userid=todos.user_id";
            //console.log("query1:",query1);
          connection.query(query1, function( error , result ){
            
              for(i=0;i<result.length;i++){
                  console.log('*****' + result[i].device_token + '*****');
                  console.log('*****' + result[i].todo_data + '*****');
                  remidermessages = result[i].todo_data;
                  registrationIds = result[i].device_token;
                  message.addData('message', remidermessages);

                  sender.send(message, registrationIds, function(err,result1) {
                      console.log("the result is");
                      console.log(result1);
                      console.log( err );
                  });
                  
              }
                res.jsonp(result);
          });
};