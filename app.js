/**
 * Module dependencies.
 */
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
app.use(

    connection(mysql,{

        host: 'cap-au-sg-prd-02.integration.ibmcloud.com',
        user: 'admin',
        password : 'admin',
        port : 15481, //port mysql
        database:'data'
    },'request')
);
//route index, albums
app.use(index);//route index
app.use(albums);//route albums methods

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
