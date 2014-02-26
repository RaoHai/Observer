var scoutBookshelf,
  Bookshelf = require('bookshelf'),
  when      = require('when'),
  moment    = require('moment'),
  _         = require('lodash'),
  config    = require('../config');



scoutBookshelf = Bookshelf.scout = Bookshelf.initialize(config().database);
scoutBookshelf.client = config().database.client;


scoutBookshelf.Model = scoutBookshelf.Model.extend({

});



module.exports = scoutBookshelf;