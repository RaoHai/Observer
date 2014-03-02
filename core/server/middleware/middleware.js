var   _   = require('lodash'),
  express = require('express'),
  config  = require('../config'),
  api     = require('../api'),

  expresServer;

function cacheServer(server) {
    expressServer = server;
}



var middleware = {

  auth: function (req, res, next) {
    console.log('middleware auth:', req.session);
    if (!req.session.user) {
      return res.redirect('/signin/');
    }

    return next();

  },

  redirectToDashboard: function (req, res, next) {
      if (req.session.user) {
          return res.redirect(config().paths.subdir + '/admin/');
      }

      next();
  },
};



module.exports = middleware;
module.exports.cacheServer = cacheServer;