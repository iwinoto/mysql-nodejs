/**
 * Module dependencies.
 */
var cfenv = require('cfenv');
var appEnv = cfenv.getAppEnv();
var express = require('express');
var index = require('./routes/index');
var albums = require('./routes/albums');
var http = require('http');
var path = require('path');
//load customers route
var customers = require('./routes/albums');
var app = express();
var connection  = require('express-myconnection');
var mysql = require('mysql');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
// all environments
app.set('port', process.env.PORT || 3306);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.use(express.favicon());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
// development only
if ('development' == app.get('env')) {
  app.use(errorHandler())
};

/*------------------------------------------
    connection peer, register as middleware
    type koneksi : single,pool and request
-------------------------------------------*/
var cfcreds = appEnv.getServiceCreds("albums-mysqldb");
default_dbcreds = {
  host: 'cap-sg-prd-4.integration.ibmcloud.com',
  user: 'admin',
  password : 'admin',
  port : 17399, //port mysql
  database:'data'}

var dbcreds = (cfcreds ? cfcreds : default_dbcreds);
//var dbcreds = default_dbcreds;

app.use(

    connection(mysql,{

        host: dbcreds.host,
        user: dbcreds.user,
        password : dbcreds.password,
        port : dbcreds.port, //port mysql
        database: dbcreds.database
    },'request')
);
//route index, albums
app.use(index);//route index
app.use(albums);//route albums methods

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
