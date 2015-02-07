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
        res.render("projects", {
            projects: projects
        });
    });
});

