var express = require('express'),
     moment = require('moment'),
     router = express.Router(),
    Promise = require('bluebird'),
         db = require('../models');

router.get('/register', function (req, res, next) {
    res.render('register');
});

router.post('/register', function (req, res, next) {
    var username        = req.body["login-email"],
        password        = req.body["login-password"],
      
        registerAsAdmin = false;

    db.user.findAll()
    .then(function (result) {
        if (result.length == 0) {
            registerAsAdmin = true;
        }
        return Promise.resolve(registerAsAdmin);
    })
    .then(function (registerAsAdmin) {

        db.user.findAll({
            where : {
                username : username
            }
        }).then(function (result) {

            if (result.length > 0) {
                res.status(500);
                return res.json({error : "username" + username + " already taken!"});
            }

            return db.user.create({
                username : username,
                password : password,
                email: username,
                role: registerAsAdmin ? 'admin' : 'user'
            }).then(function (result) {

                if (req.xhr) {
                    res.json(result);
                } else {
                    res.redirect('back');
                }

            });
        });
    });
});

router.get('/login', function (req, res, next) {
    res.render('login', {
        redirect: req.query.redirect || "/"
    });
});


router.post('/login', function (req, res, next) {
    var username = req.body["login-email"],
        password = req.body["login-password"],
        remember = req.body["remember"],
        session  = req.session;


    db.user.find({
        where : {
          username : username
        }
    }).then(function (user) {
        if (!user) {
            return res.reject(401, {error: "username or password invalid"}, function () {
                res.redirect('back');
            });
        }
        user.validPassword(password, function (err, validResult) {
            if (err) {
                return res.reject(401, {error: "username or password invalid"}, function () {
                    res.redirect('back');
                });
            }
            var values = user.get();
            delete values.password;
            session.user = values;

            if (remember == "on") {
                res.cookie('user', values, {maxAge: 60 * 1000});
            }

            res.redirect(req.query.redirect || "/");
            
        });
    });

});

module.exports = function (app) {
    app.use('/', router);
};
