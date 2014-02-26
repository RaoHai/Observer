var Settings,
  scoutBookShelf = require('./base'),
  uuid           = require('node-uuid'),
  _              = require('lodash'),
  log            = require('../log'),
  when           = require('when');

  Settings = scoutBookShelf.Model.extend({
    tableName : 'settings',

    permittedAttributes: ['id', 'uuid', 'key', 'value', 'type', 'created_at', 'created_by', 'updated_at', 'update_by'],
    
  })