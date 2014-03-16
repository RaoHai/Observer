  var when           = require('when'),
  _                  = require('lodash'),
  dataProvider       = require('../models'),
  settings           = require('./settings'),
  ONE_DAY            = 86400000,
  brands;

brands = {
  // #### Browse
  read: function read(args) {

        return dataProvider.Brand.read(args).then(function (result) {
            if (result) {
                return result.toJSON();
            }

            return when.reject({errorCode: 404, message: 'Brand not found'});
        });
    },
  // **takes:** options object
  browse: function browse(options) {
    // **returns:** a promise for a collection of users in a json object

    return dataProvider.Brand.browse(options).then(function(result) {
      var i = 0,
        omitted = {};

      if (result) {
        omitted = result.toJSON();
      }

      return omitted;
    });
  },

  add: function add(brandData) {
    return dataProvider.Brand.add(brandData);
  },

  check: function check(brandData) {
      // **returns:** on success, returns a promise for the resulting user in a json object
    return dataProvider.Brand.check(brandData);
  },

  update : function update (brandData) {
    return dataProvider.Brand.edit(brandData);
  },

  delete: function (brandData) {
    return dataProvider.Brand.findOne(brandData).then(function (brand) {
      if (brand.get('id')) {
        return dataProvider.Brand.destroy(brand.get('id'));
      }
    });
  }
};

module.exports = brands;