var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');
var mysql = require('mysql');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({secret : '123456789',saveUninitialized: true,resave: true}));

const indexRouter = require('./routes/index');
const studentRouter = require('./routes/students');
const ratingRouter = require('./routes/ratings');


app.use('/',indexRouter);
app.use('/students',studentRouter);
app.use('/ratings',ratingRouter);

app.listen(port);
