var express = require('express');
var router = express.Router();
var http = require('http');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var connection = require('./database');
var userCRUD = CRUD(connection,'user');

exports.login = function(req,res){
  	  var email = req.body.user_email;
      var password = req.body.user_password;
      userCRUD.load({
        user_email : email,
        user_password : password
      }, function (err, val) {
        var resdata={
            record:'',
            status:false,
            message :'err'
        };
        if(val.length>0){
	        resdata.record=val;
	        resdata.status=true;
	        resdata.message='successfully login welcome ';
	        res.jsonp(resdata);
	      }else{
          resdata.status = false;
          resdata.message = 'Wrong user name or password';
          res.jsonp(resdata);
      }
	});
}
