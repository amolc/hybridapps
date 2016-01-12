var express = require('express');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
//var sendnotification = require('./pushnotification');
var connection = env.Dbconnection;
var SendNotification = CRUD(connection,'todos');
var deviceCrud  = CRUD(connection,'device_information');



exports.sendnotification = function(req,res){
	console.log(req.body);
	var query1 = "SELECT todo_id,todo_data,user_id,reminder_date,reminder_time,deviceid,platform,device_token FROM device_information JOIN todos ON device_information.userid=todos.user_id where userid = req.body.user_id";
	connection.query(query1, function( error , result ){
      if(result ){
        responsedata = {
              status: true,
              record : result
          }
      } else {
        responsedata = {
              status: false,
              message:'Failed to get data'
          }
      }
      console.log(result);
      console.log(error);
      res.jsonp( responsedata );
    });

};