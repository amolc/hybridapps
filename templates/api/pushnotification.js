var express = require('express');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var SendNotification = CRUD(connection,'todos');
var deviceCrud  = CRUD(connection,'device_information');
var exports = module.exports = {};

exports.pushnotification = function(messagetitle, message, userid) {

			    	var gcm = require('node-gcm');
			    	//var device_token = "APA91bEwcpQLaTEByT37g-zxj0PhhG9n_G--a_BxyD-bLJe9GN3hz2T3QEpOEbo2k9ez0GxTie7ZfS5pm2QoST8I_oAsyAAomwiiI2kB9oDRZUmOpZxrL-nfGblyynW4azpuI2cx1eNF";
    				var sender = new gcm.Sender('AIzaSyAJ9kNU7h4VSK2oiqrD5EatNVvzBD6zsxw');
    				var message = new gcm.Message(); //create a new message

    				message.addData('title', 'New Message');
    				message.addData('message', 'Push Notification sample');
    				message.addData('sound', 'notification');

				    message.collapseKey = 'testing'; //grouping messages
				    message.delayWhileIdle = true; //delay sending while receiving device is offline
				    message.timeToLive = 3000; //the number of seconds to keep the message on the server if the device is offline

				    var userid = req.body.user_id;
				    var registrationIds = [];
  				    var totalrows={};
					
					var query1 = "SELECT todo_id,todo_data,user_id,reminder_date,reminder_time,deviceid,platform,device_token FROM device_information JOIN todos ON device_information.userid=todos.user_id";
					console.log("query1:",query1);
					connection.query(query1, function( error , result ){
				      console.log(result);
				      /*if(result ){
				        responsedata = {
				              status: true,
				              record : result
				          }
				          	res.jsonp( responsedata );
				      } else {
				        responsedata = {
				              status: false,
				              message:'Failed to get data'
				          }
				           res.jsonp( responsedata );
				      }*/
				    });

					sender.send(message, device_token, function(err,result) {
						console.log("the result is");
						console.log( result );
						console.log( err );
					});

}