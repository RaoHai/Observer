  var _        = require('lodash'),
  dataProvider = require('../models'),
  when         = require('when'),
  log          = require('../../log'),
  config       = require('../config'),
  errors       = require('../../errorHandling'),
  settings,
  settingsObject,
  settingsCollection,
  settingsCache = {}


  settings = {
    read : function read(options) {
     if (_.isString(options)) {
          options = { key: options };
      }

      if (settingsCache) {
          return when(settingsCache[options.key]).then(function (setting) {
              if (!setting) {
                  return when.reject({errorCode: 404, message: 'Unable to find setting: ' + options.key});
              }
              var res = {};
              res.key = options.key;
              res.value = setting.value;
              return res;
          }, errors.logAndThrowError);
      }
    },
    edit : function edit(key, value) {
      return dataProvider.Settings.read(key).then(function (setting) {
        if (!setting) {
          return when.reject({errorCode: 404, message : 'Unable to find setting: ' + key});
        }
        if (!_.isString(value)) {
          value = JSON.stringify(value);
        }
        setting.set('value', value);
        return dataProvider.Settings.edit(setting).then(function (result) {
            settingsCache[_.first(result).attributes.key].value = _.first(result).attributes.value;
        });
      });
    }
  };


module.exports = settings;