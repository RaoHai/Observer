var express = require('express'),
     moment = require('moment'),
     router = express.Router(),
       role = require('../middlewares').requireRole,
         db = require('../models');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/', function (req, res, next) {
    
    res.render('index', {
        title: 'Generator-Express MVC'
    });

});

router.get('/admin', role('admin'), function(req, res, next) {
    res.json("admin");
});



