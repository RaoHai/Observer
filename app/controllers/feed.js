var express = require('express'),
moment      = require('moment'),
router      = express.Router(),
role        = require('../middlewares').requireRole,
passport    = require('passport'),
FeedParser  = require('feedparser'),
feedparser  = new FeedParser(),
request     = require('request'),
db          = require('../models');

module.exports = function (app) {
    app.use('/', router);
};

router.get('/feed', passport.authenticate('basic', { session: false }), 
    function (req, res, next) {
        request(req.query.url).on('response', function (response) {
            var stream = this;
            stream.pipe(feedparser);
        });
        result = [];
        feedparser.on('readable', function() {
            var stream = this
            , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
            , item;

            while (item = stream.read()) {
                result.push(item);
            }
        });

        feedparser.on('end', function() {
            res.json(result);
        });
    }
);