//for database connection
var mysql = require('mysql');

config.connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

module.exports = config;
