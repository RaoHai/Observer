var 
  // api         = require('../api'),
  when        = require('when'),
  Route       = require('express').Route,
  config      = require('../config'),
  frontendControllers;


frontendControllers = {
  'homepage' : function (req, res, next) {
    res.end('hello world!');
    // return next();
  }
}


module.exports = frontendControllers;