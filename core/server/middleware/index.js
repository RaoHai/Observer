var   api    = require('../api'),
  config     = require('../config'),
  middleware = require('./middleware'),

  expressServer

module.exports = function (server, dbHash) {
   expressServer = server;
   moddleware.cacheServer(expressServer);
};



module.exports.middleware = moddleware;


