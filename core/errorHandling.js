var _ = require('underscore'),
  errors;

errors = {
  throwError: function (err) {
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
  'throwError'
], function (funcName) {
  errors[funcName] = errors[funcName].bind(errors);
});

module.exports = errors;