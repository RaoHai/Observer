var observerBookshelf,
  Bookshelf = require('bookshelf'),
  when      = require('when'),
  moment    = require('moment'),
  _         = require('lodash'),
  errors    = require('../../errorHandling'),
  config    = require('../config');



observerBookshelf = Bookshelf.observer = Bookshelf.initialize(config().database);
observerBookshelf.client = config().database.client;


observerBookshelf.Model = observerBookshelf.Model.extend({
  hasTimestamps: true,
},{
  findAll:  function (options) {
      options = options || {};
      return observerBookshelf.Collection.forge([], {model: this}).fetch(options);
  },


  browse: function () {
      return this.findAll.apply(this, arguments);
  },

  destroy: function (_identifier, options) {
        options = options || {};
        return this.forge({id: _identifier}).destroy(options);
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
      // console.log('add:', newObj);
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
      return instance.save(null, options).then(function (res) {
        return res;
      }, errors.logAndThrowError);
      
  },

  create: function () {
    return this.add.apply(this, arguments);
  },
});



module.exports = observerBookshelf;