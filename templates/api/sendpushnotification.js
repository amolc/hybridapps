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
	deviceCrud.load({},function(err,val){
		console.log(val);
	});
};