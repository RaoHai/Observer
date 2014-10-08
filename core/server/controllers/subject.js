/*globals require, console*/
var
    api = require('../api'),
    when = require('when'),
    request = require('request'),
    url = require('url'),
    cheerio = require('cheerio'),
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
           res.json(subjects);
        });
    },

    'save' : function(req, res) {
        var name = req.body.name,
            url = req.body.url,
            description = req.body.description;
        var _subject = {
            name : name,
            url : url,
            description : description,
            user_id : req.session.user
        };
        console.log('add subject:', _subject);
        return api.subject.add(_subject).then(function (subject) {
           return res.json(subject);
        }).otherwise(function (err) {
           res.error(400, err);
        });
    },

    'sniff' : function (req, res) {
        var _url = req.query.url;
        var domain = url.parse(_url);

        request(_url, function (err, response, body) {
            var $ = cheerio.load(body);
            var rss = url.parse($('link[type="application/rss+xml"]').attr('href'));
            if (/^https?:\/\//.test(rss) == false) {
                domain.pathname = rss.pathname;
                domain.path = rss.path;
                domain.href = rss.href;
                console.log(" [HERE] ", domain);
                rss = url.format(domain);
            }
            res.json({
                title : $('title').text(),
                rss : rss
            });
        });
    }
};


module.exports = subjectControllders;


