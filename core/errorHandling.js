var _ = require('lodash'),
  log = require('./log'),
  errors;

errors = {
  logAndThrowError: function (err) {
    log({
      type : 'error',
      message : err
    });

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