var express = require('express');
//var router = express.Router();
var http = require('http');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var connection = require('./database');
var todosCRUD = CRUD(connection,'todos');

exports.addtodos = function(req,res){
  	  todosCRUD.create({
  	  	'todo_data':req.body.todo_data,
  	  	'user_id':req.body.user_id
  	  },function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        todo_id: result.insertId,
	        message: 'Todos Inserted successfully'
	      }
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'Todos Failed Insert'
	      }
	      res.jsonp(responsedata);
	    }
  });
}

exports.gettodos = function(req,res){
  	  todosCRUD.load({
  	  	'user_id':req.body.user_id
  	  },function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        message: 'Todos List'
	      }
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'Todos List Failed'
	      }
	      res.jsonp(responsedata);
	    }
  });
}

exports.gettododetails = function(req,res){
  	  todosCRUD.load({
  	  	'todo_id':req.body.todo_id
  	  },function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        message: 'Todos List'
	      }
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'Todos List Failed'
	      }
	      res.jsonp(responsedata);
	    }
  });
}