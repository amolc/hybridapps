//for database connection
var mysql = require('mysql');
var connection = mysql.createPool({
		database : 'demoapp',
	    user : 'ftdev',
		password : '10gXWOqeaf',
	    host :'apps.fountaintechies.com',
	});	

module.exports = connection;
 

