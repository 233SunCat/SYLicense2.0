var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var equipmentRouter = require('./routes/equipment');
var modelRouter = require('./routes/model');
var shipRouter = require('./routes/ShipClient');
var loginRouter = require('./routes/Login')
const MongodbInit = require("./controller/MongodbInit")
const bodyParser = require('body-parser');

MongodbInit();//链接数据库


var app = express();
app.use(express.static('./uploads'))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Equipment',equipmentRouter);
app.use('/Model',modelRouter);
app.use('/ShipClient',shipRouter);
app.use('/Login',loginRouter);
app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', ' 3.2.1')
    req.method == "OPTIONS" ? res.send(200) : next()
  })
  
module.exports = app;
