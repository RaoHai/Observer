var   _   = require('lodash'),
  express = require('express'),
  config  = require('../config'),
  api     = require('../api'),

  expresServer;

function cacheServer(server) {
    expressServer = server;
}

var middleware = {
  authenticate : function (req, res, next) {
    var noAuthNeed = [
    ],
    subPath;

    if (noAuthNeeded.indexOf(subPath) < 0) {
        return middleware.auth(req, res, next);
    }
  },

  auth: function (req, res, next) {
    if (!req.session.user) {
      return res.redirect(config().paths.subdir + '/signin/' + redirect);
    }

    next();

  },
};



module.exports = middleware;
module.exports.cacheServer = cacheServer;