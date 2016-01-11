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
