var express = require('express'),
  moment = require('moment'),
  router = express.Router(),
  db = require('../models');

router.get('/register', function (req, res, next) {
    res.render('register');
});

router.post('/register', function (req, res, next) {
  var username = req.body["login-email"],
      password = req.body["login-password"];

  db.user.findAll({
    where : {
      username : username
    }
  }).then(function (result) {

    if (result.length > 0) {
      res.status(500);
      return res.json({error : "username" + username + " already taken!"});
    }

    db.user.create({
      username : username,
      password : password,
      email: username
    }).then(function (result) {
      res.json(result);
    });
  });
});

router.get('/login', function (req, res, next) {
    res.render('login');
});


router.post('/login', function (req, res, next) {
    var username = req.body["login-email"],
        password = req.body["login-password"];

    db.user.find({
        where : {
          username : username
        }
    }).then(function (user) {
        if (!user) {
            res.status(401);
            return res.json({error: "username or password invalid"});
        }
        // console.log(">", user);
        user.validPassword(password, function (err, validResult) {
            if (err) {
                res.status(401);
                return res.json({error: "username or password invalid"});
            }
            var values = user.get();
            delete values.password;
            res.json(values);
        });
    });

});

module.exports = function (app) {
  app.use('/', router);
};
