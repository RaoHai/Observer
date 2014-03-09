  var when           = require('when'),
  _                  = require('lodash'),
  dataProvider       = require('../models'),
  settings           = require('./settings'),
  ONE_DAY            = 86400000,
  filteredAttributes = ['password', 'created_by', 'updated_by', 'last_login'],
  users;

users = {
  // #### Browse
  read: function read(args) {
        // **returns:** a promise for a single user in a json object
        if (args.id === 'me') {
            args = {id: this.user};
        }

        return dataProvider.User.read(args).then(function (result) {
            if (result) {
                var omitted = _.omit(result.toJSON(), filteredAttributes);
                return omitted;
            }

            return when.reject({errorCode: 404, message: 'User not found'});
        });
    },
  // **takes:** options object
  browse: function browse(options) {
    // **returns:** a promise for a collection of users in a json object

    return dataProvider.User.browse(options).then(function(result) {
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

  check: function check(userData) {
      // **returns:** on success, returns a promise for the resulting user in a json object
    return dataProvider.User.check(userData);
  },

  delete: function (userData) {
    return dataProvider.User.findOne(userData).then(function (user) {
      if (user.get('id')) {
        return dataProvider.User.destroy(user.get('id'));
      }
    });
  }
};

module.exports = users;