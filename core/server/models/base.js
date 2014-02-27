var scoutBookshelf,
  Bookshelf = require('bookshelf'),
  when      = require('when'),
  moment    = require('moment'),
  _         = require('lodash'),
  errors    = require('../../errorHandling'),
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

  edit: function (editedObj, options) {
    options = options || {};
    return this.forge({id: editedObj.id}).fetch(options).then(function (foundObj) {
        return foundObj.save(editedObj, options);
    });
  },

  findOne: function (args, options) {
      options = options || {};
      return this.forge(args).fetch(options);
  },

  read: function () {
    return this.findOne.apply(this, arguments);
  },

  /**
   * Naive create
   * @param newObj
   * @param options (optional)
   */
  add: function (newObj, options) {
      console.log('add:', newObj);
      options = options || {};
      var instance = this.forge(newObj);
      // We allow you to disable timestamps
      // when importing posts so that
      // the new posts `updated_at` value
      // is the same as the import json blob.
      // More details refer to https://github.com/TryGhost/Ghost/issues/1696
      if (options.importing) {
          instance.hasTimestamps = false;
      }
      var result = instance.save(null, options).then(function () {
        console.log('save successed!');
      }, errors.logAndThrowError);
      console.log(result);
      return result;
  },

  create: function () {
    return this.add.apply(this, arguments);
  },
});



module.exports = scoutBookshelf;