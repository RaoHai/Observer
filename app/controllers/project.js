var express = require('express'),
     moment = require('moment'),
     router = express.Router(),
       role = require('../middlewares').requireRole,
         db = require('../models');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/projects', role(['user','admin']), function(req, res, next) {
    db.project.findAll().then(function (projects) {
        console.log(">", projects);
        res.render("projects", {
            projects: projects
        });
    });
});


router.post('/projects', role(['user', 'admin']), function (req, res, next) {
    var newProject = {
        name : req.body["project-name"],
        url : req.body["project-url"],
        description : req.body["project-description"],
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
