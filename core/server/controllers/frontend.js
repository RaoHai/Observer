/*globals require, console*/
var
    api    = require('../api'),
    when   = require('when'),
    Route  = require('express').Route,
    errors = require('../../errorHandling'),
    config = require('../config'),
    frontendControllers;


frontendControllers = {
  'homepage': function(req, res) {

    return when.all([
      api.brands.browse(),
      api.trainings.findAll()
    ])
    .then(function(result) {
      var brands = result[0],
        trainings = result[1];
        console.log('trainings:', trainings);

      res.render('index', {
        brands: brands,
        trainings : trainings
      });
    });
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
      res.error(422, err);
    });

  },

  'doLogin': function (req, res) {
    var email = req.body.email,
      password = req.body.password;

    return api.users.check({
      email: email,
      password: password
    }).then(function (userid) {
      if (userid) {
        req.session.user = userid; 
        res.json(200, {redirect: '/'});
      } else {
        res.error(400, new Error('password incorrect!'));
      }
    }, function (err) {
      console.log("error:", err);
      res.error(422, new Error('password incorrect!'));
    });
  }



}


module.exports = frontendControllers;