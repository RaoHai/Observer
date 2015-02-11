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
    function (req, res, next) {
        db.project.findAll().then(function (projects) {
            res.json(projects);
        });
});

router.post('/projects', passport.authenticate('basic', { session: false }), 
    function (req, res, next) {
        var newProject = {
            name : req.body.name,
            url : req.body.url,
            description : req.body.description,
            userId : req.user.id
        };
        db.project.create(newProject).then(function (result) {
            res.json({data : result});
        }, function (err) {
            console.log("error:", err);
            res.json(err);
        });
    }
);

// router.post('/projects', passport.authenticate('basic', { session: false }), 
//     function (req, res, next) {

//         var newProject = {
//             name : req.body.name,
//             url : req.body.url,
//             description : req.body.description,
//             userId : req.session.user.id
//         };
//         console.log("projects post > ", newProject);
        
//         db.project.create(newProject).then(function (result) {
//             res.json(result);
//         }, function (err) {
//             console.log("error:", err);
//             res.json(err);
//         });
// });
