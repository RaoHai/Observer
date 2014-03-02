var _ = require('lodash'),
  log = require('./log'),
  errors;

errors = {
  logAndThrowError: function (err) {
    var errorObject ;

    if (typeof err === 'object') {
      errorObject = err;
      err.message = err.stack ? [err.stack] : [err.message];
      err.type = 'error';
    } else {
      errorObject = {
        type : 'error',
        message : err
      }
    }

    log(err);

    if (!err) {
      err = new Error("An error occurred");
    }

    if (_.isString(err)) {
      throw new Error(err);
    }
    throw err;

  }
};


_.each([
  'logAndThrowError'
], function (funcName) {
  errors[funcName] = errors[funcName].bind(errors);
});

module.exports = errors;