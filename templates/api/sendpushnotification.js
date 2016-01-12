var express = require('express');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
//var sendnotification = require('./pushnotification');
var connection = env.Dbconnection;
var SendNotification = CRUD(connection,'todos');


exports.sendnotification = function(req,res){
	console.log(req.body);
}