
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var MongoStore = require('connect-mongo')(express); 
var settings = require('./settings');

var app = module.exports = express.createServer();

// all environments

app.configure(function(){ app.set('views', __dirname + '/views'); 
    app.set('view engine', 'ejs'); 
    app.use(express.bodyParser()); 
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({
        secret: settings.cookieSecret,
        store: new MongoStore({
            db: settings.db
        })
     }));
    app.use(express.router(routes));
    app.use(express.static(__dirname + '/public'));
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

app.listen(3000);

