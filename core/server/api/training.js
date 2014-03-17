  var when           = require('when'),
  _                  = require('lodash'),
  dataProvider       = require('../models'),
  settings           = require('./settings'),
  ONE_DAY            = 86400000,
  trainings;

trainings = {
  // #### Browse
  read: function read(args) {

        return dataProvider.Training.read(args).then(function (result) {
            if (result) {
                return result.toJSON();
            }

            return when.reject({errorCode: 404, message: 'Training not found'});
        });
  },

  findAll : function findAll(options) {
    return dataProvider.Training.findAll().then(function(result) {
      var i = 0,
        omitted = {};

      if (result) {
        omitted = result.toJSON();
      }

      return omitted;
    });

  },
  // **takes:** options object
  browse: function browse(options) {
    // **returns:** a promise for a collection of users in a json object

    return dataProvider.Training.browse(options).then(function(result) {
      var i = 0,
        omitted = {};

      if (result) {
        omitted = result.toJSON();
      }

      return omitted;
    });
  },

  add: function add(brandData) {
    return dataProvider.Training.add(brandData);
  },

  check: function check(brandData) {
      // **returns:** on success, returns a promise for the resulting user in a json object
    return dataProvider.Training.check(brandData);
  },

  update : function update (brandData) {
    return dataProvider.Training.edit(brandData);
  },

  delete: function (brandData) {
    return dataProvider.Training.findOne(brandData).then(function (brand) {
      if (brand.get('id')) {
        return dataProvider.Training.destroy(brand.get('id'));
      }
    });
  }
};

module.exports = trainings;