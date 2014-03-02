var 
  // api         = require('../api'),
  when        = require('when'),
  Route       = require('express').Route,
  config      = require('../config'),
  frontendControllers;


frontendControllers = {
  'homepage' : function (req, res, next) {
    res.render('index');
  },
  'login': function (req, res) {
      /*jslint unparam:true*/
      res.render('login');
  }


}


module.exports = frontendControllers;