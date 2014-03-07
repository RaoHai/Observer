var 
  api         = require('../api'),
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
  },

  'signup' : function (req, res) {
    res.render('signup');
  },

  'doSignup': function (req, res) {
    var name = req.body.name,
      email = req.body.email,
      password = req.body.password;

    api.users.add({
      name: name,
      email: email,
      password: password
    }).then(function (user) {
      console.log(user);
      res.json(user);
    });

  }



}


module.exports = frontendControllers;