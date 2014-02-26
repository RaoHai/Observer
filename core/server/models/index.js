    var _        = require('lodash'),
    when         = require('when');
    log          = require('../../log'),
    sequence     = require('when/sequence'),
    schema       = require('./schema').tables,
    schemaTables = _.keys(schema),
    knex         = require('./base').knex;



  function getDatabaseVersion() {
    return knex.schema.hasTable('settings').then(function (exists) {
      if (exists) {
        return 0.1;
      }

      throw new Error('Settings table does not exist');
    });
  }


  module.exports = {
    User: require('./user').User,
    Session: require('./session').Session,

    init: function () {
      var deferred = when.defer();

      var self = this;

      return getDatabaseVersion().then(function (databaseVersion) {

      }, function (err) {
        if (err.message || err === 'Settings table does not exist') {
          // 4. The database has not yet been created
          // Bring everything up from initial version.
          return self.migrateUpFreshDb();
        }
      });

      deferred.resolve();
      return deferred.promise;
    },

    migrateUpFreshDb : function () {
      var self = this;

      var tables = [];
      tables = _.map(schemaTables, function (table) {
        return function () {
          return self.createTable(table);
        };
      });

      return sequence(tables).then(function () {
        
      });
    },

    createTable: function (table) {
      return knex.schema.createTable(table, function (t) {
        var column,
          columnKeys = _.keys(schema[table]);
        _.each(columnKeys, function (key) {
          // creation distinguishes between text with fieldtype, string with maxlength and all others
          if (schema[table][key].type === 'text' && schema[table][key].hasOwnProperty('fieldtype'))  {
            column = t[schema[table][key].type](key, schema[table][key].fieldtype);
          } else if (schema[table][key].type === 'string' && schema[table][key].hasOwnProperty('maxlength'))  {
            column = t[schema[table][key].type](key, schema[table][key].maxlength);
          } else {
            column = t[schema[table][key].type](key);
          }

          if (schema[table][key].hasOwnProperty('nullable') && schema[table][key].nullable === true) {
            column.nullable();
          } else {
            column.notNullable();
          }
          if (schema[table][key].hasOwnProperty('primary') && schema[table][key].primary === true) {
            column.primary();
          }
          if (schema[table][key].hasOwnProperty('unique') && schema[table][key].unique) {
            column.unique();
          }
          if (schema[table][key].hasOwnProperty('unsigned') && schema[table][key].unsigned) {
            column.unsigned();
          }
          if (schema[table][key].hasOwnProperty('references') && schema[table][key].hasOwnProperty('inTable')) {
            //check if table exists?
            column.references(schema[table][key].references);
            column.inTable(schema[table][key].inTable);
          }
          if (schema[table][key].hasOwnProperty('defaultTo')) {
            column.defaultTo(schema[table][key].defaultTo);
          }
        });
      });
    }

  }