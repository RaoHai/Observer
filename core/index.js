/**
 * Scout core
 */

var bootstrap = require('./bootstrap'),
    errors    = require('./errorHandling');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function scout(options) {
  this.options = options || {};
}

scout.prototype.watch = function() {
  var self = this;
  bootstrap(self.options.config).then(function () {
      var scoutServer = require('./server');
      scoutServer(self.options.app);
  }).otherwise(errors.throwError);
};

module.exports = scout;