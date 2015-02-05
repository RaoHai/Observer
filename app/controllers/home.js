var express = require('express'),
  moment = require('moment'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {

  db.user.findAll().success(function (users) {
    console.log("findall:", users);
    res.render('index', {
      title: 'Generator-Express MVC',
      users: users
    });
  });
});



