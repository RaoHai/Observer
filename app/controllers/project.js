var express = require('express'),
     moment = require('moment'),
     router = express.Router(),
       role = require('../middlewares').requireRole,
       passport = require('passport'),
         db = require('../models');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/projects', passport.authenticate('basic', { session: false }), 
    function(req, res, next) {
        db.project.findAll().then(function (projects) {
            res.json(projects);
        });
});


router.post('/projects', role(['user', 'admin']), function (req, res, next) {
    var newProject = {
        name : req.body.name,
        url : req.body.url,
        description : req.body.description,
        userId : req.session.user.id
    };

    db.project.create(newProject).then(function (result) {
        return res.ok(200, result, function () {
            res.redirect('/projects');
        });
    }, function (err) {
        return res.ok(500, {error : err}, function () {
            res.redirect('/projects');
        });
    });
});
