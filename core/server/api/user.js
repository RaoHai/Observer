var when               = require('when'),
    _                  = require('lodash'),
    dataProvider       = require('../models'),
    settings           = require('./settings'),
    ONE_DAY            = 86400000,
    filteredAttributes = ['password', 'created_by', 'updated_by', 'last_login'],
    users;

users = {
  // #### Browse

  // **takes:** options object
  browse: function browse(options) {
      // **returns:** a promise for a collection of users in a json object

      return dataProvider.User.browse(options).then(function (result) {
          var i = 0,
              omitted = {};

          if (result) {
              omitted = result.toJSON();
          }

          for (i = 0; i < omitted.length; i = i + 1) {
              omitted[i] = _.omit(omitted[i], filteredAttributes);
          }

          return omitted;
      });
  },

  add: function add(userData) {
        return dataProvider.User.add(userData);
    },
};

module.exports = users;