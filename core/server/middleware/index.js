var   api    = require('../api'),
  config     = require('../config'),
  middleware = require('./middleware'),
  BSStore    = require('../bookshelf-session'),
  models     = require('../models'),
  hbs        = require('express-hbs'),
  express    = require('express'),

  expressServer


function redirectToSignup(req, res, next) {
    /*jslint unparam:true*/
    api.users.browse().then(function (users) {
        if (users.length === 0) {
            return res.redirect(config().paths.subdir + '/signup/');
        }
        next();
    }).otherwise(function (err) {
        return next(new Error(err));
    });
}



module.exports = function (server, dbHash) {
  var subdir = config().paths.subdir,
  expressServer = server;

  middleware.cacheServer(expressServer);


  if (expressServer.get('env') !== 'development') {
    expressServer.use(express.logger());
  } else {
    expressServer.use(express.logger('dev'));
  }

  cookie = {
      path: subdir + '/observer/',
      maxAge: 12 * 60 * 60 * 1000
  };

 

  expressServer.use(express.json());
  expressServer.use(express.urlencoded());

  expressServer.use(express.bodyParser());
  expressServer.use(express.methodOverride());
  expressServer.use(express.cookieParser(dbHash));

  expressServer.use(express.session());

  expressServer.use(subdir, expressServer.router);
  console.log('middleware finished');
  // 
  // expressServer.use(express.favicon());
  // expressServer.use(express.logger("dev"));
  // expressServer.use(express.bodyParser());
  // expressServer.use(express.methodOverride());
  // expressServer.use(express.cookieParser(dbHash));
  
  // expressServer.use(express.session());
};



module.exports.middleware = middleware;

module.exports.middleware.redirectToSignup = redirectToSignup;


