/*globals require, console*/
var
    api = require('../api'),
    when = require('when'),
    Route = require('express').Route,
    errors = require('../../errorHandling'),
    config = require('../config'),

    subjectControllders;

subjectControllders = {
    'index' : function(req, res) {
        var user = req.session.user;
        return api.subject.browse({
            user_id : user
        }).then(function (subjects) {
           return res.render('subject/list', {
               subjects: subjects
           });
        });
    }
};


module.exports = subjectControllders;


