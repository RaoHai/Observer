/**
 * observer core
 */

var bootstrap = require('./bootstrap'),
  errors = require('./errorHandling'),
  observerServer = require('./server');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

function observer(options) {
  this.options = options || {};
}

observer.prototype.watch = function() {
  var self = this;
  bootstrap(self.options.config).then(function() {
 
    observerServer(self.options.app);

  })
  .otherwise(errors.logAndThrowError);
};

module.exports = observer;