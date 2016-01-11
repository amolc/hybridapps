var express = require('express');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var devicecrud = CRUD(connection,'device_information');

exports.deviceregister = function(req,res){
	  devicecrud.load({
	  	'deviceid':req.body.deviceid,
	  },function (err,val){
	  	    var responsedata={
            record:'',
            status:false,
            message :'err'
        };
        if(val.length>0){
	        responsedata.record=val;
	        responsedata.status=false;
	        responsedata.message='Device Already Register';
	        res.jsonp(responsedata);
	      }else{
	      	 devicecrud.create({
		  	  	'platform':req.body.platform,
		  	  	'userid':req.body.userid,
		  	  	'device_token':req.body.device_token,
		  	  	'deviceid':req.body.deviceid,
		  	  	'created_on':env.timestamp(),
		  	  	'modified_on':env.timestamp()
		  	  },function(error, result) {
			    if (result) {
/*			    	var gcm = require('node-gcm');
			    	var device_token = req.body.device_token;
			    	var sender = new gcm.Sender(419937285756); //create a new sender
    				var message = new gcm.Message(); //create a new message

    				message.addData('title', 'New Message');
    				message.addData('message', 'Mobile Register successfully');
    				message.addData('sound', 'notification');

				    message.collapseKey = 'testing'; //grouping messages
				    message.delayWhileIdle = true; //delay sending while receiving device is offline
				    message.timeToLive = 3; //the number of seconds to keep the message on the server if the device is offline
			     	
			     	sender.send(message, device_token, function(result){
        				console.log(result);
        				console.log('push sent to: ' + device_token);
    				});*/

			      responsedata = {
			        status: true,
			        record: result,
			        registration_id: result.insertId,
			        message: 'Device Register successfully'
			      }
			      res.jsonp(responsedata);
			    } else {
			      responsedata = {
			        status: false,
			        record: result,
			        message: 'Device Register Failed'
			      }
			      res.jsonp(responsedata);
			    }
  			});
          	
      	}
	  });
}
