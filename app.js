var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var socket_5000 = require("./Socket/socket_5000");



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const fetch = require("node-fetch");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
});


module.exports = app;
