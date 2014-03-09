/*globals require, console*/
var
  api    = require('../api'),
  when   = require('when'),
  Route  = require('express').Route,
  config = require('../config'),
  frontendControllers;


frontendControllers = {
  'homepage': function(req, res) {
    res.render('index');
  },

  'login': function(req, res) {
    /*jslint unparam:true*/
    res.render('login');
  },

  'signup': function(req, res) {
    res.render('signup');
  },

  'doSignup': function(req, res) {
    var name = req.body.name,
      email = req.body.email,
      password = req.body.password;

    console.log('doSignup');
    return api.users.add({
      name: name,
      email: email,
      password: password
    }).then(function(user) {
      if (req.session.user === undefined ) {
        req.session.user = user.id;      
      }
      res.json(200, {redirect: '/'});

    }).otherwise(function (err) {
      res.json(422, err);
    });

  },

  'doLogin': function () {
    var email = req.body.email,
      password = req.body.password;
  }



}


module.exports = frontendControllers;