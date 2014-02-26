var scoutBookshelf,
  Bookshelf = require('bookshelf'),
  when      = require('when'),
  moment    = require('moment'),
  _         = require('lodash'),
  config    = require('../config');



scoutBookshelf = Bookshelf.scout = Bookshelf.initialize(config().database);
scoutBookshelf.client = config().database.client;


scoutBookshelf.Model = scoutBookshelf.Model.extend({
  hasTimestamps: true,
},{
  findAll:  function (options) {
      options = options || {};
      return scoutBookshelf.Collection.forge([], {model: this}).fetch(options);
  },
});



module.exports = scoutBookshelf;