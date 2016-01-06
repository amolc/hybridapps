var express = require('express');
var mysql = require('mysql');
var CRUD = require('mysql-crud');
var env = require('./environment');
var connection = env.Dbconnection;
var todosCRUD = CRUD(connection,'todos');

exports.addtodos = function(req,res){
	var rem_Date = req.body.reminder_date;
    var startTime = new Date(rem_Date);
    var reminderdate = startTime.getTime();

  	  todosCRUD.create({
  	  	'todo_data':req.body.todo_data,
  	  	'user_id':req.body.user_id,
  	  	'reminder_date':reminderdate,
  	  	'created_on':env.timestamp(),
  	  	'modified_on':env.timestamp()
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

exports.updatetodos = function(req,res){
	 var rem_Date = req.body.reminder_date;
     var startTime = new Date(rem_Date);
     var reminderdate = startTime.getTime();
  	  
  	  todosCRUD.update({
  	  	'todo_id':req.body.todo_id,
  	  },{
  	  	'todo_data':req.body.todo_data,
  	  	'reminder_date':reminderdate,
  	  	'modified_on':env.timestamp()
  	  },function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        message: 'Todos Updated successfully'
	      }
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'Todos Failed to Update'
	      }
	      res.jsonp(responsedata);
	    }
  });
}

exports.deletetodo = function(req,res){
	todosCRUD.destroy({
	    'todo_id': req.body.todo_id
	  }, function(error, result) {
	    if (result) {
	      responsedata = {
	        status: true,
	        record: result,
	        message: 'Todos Deleted successfully'
	      }
	      res.jsonp(responsedata);
	    } else {
	      responsedata = {
	        status: false,
	        record: result,
	        message: 'Todos Failed to Delete'
	      }
	      res.jsonp(responsedata);
	    }
  });
}	