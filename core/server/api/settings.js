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

  updateSettingsCache = function (settings) {
      settings = settings || {};

      if (!_.isEmpty(settings)) {
          _.map(settings, function (setting, key) {
              settingsCache[key].value = setting.value;
          });
      } else {
          return when(dataProvider.Settings.findAll()).then(function (result) {
              return when(readSettingsResult(result)).then(function (s) {
                  settingsCache = s;
              });
          });
      }
  };

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
      // console.log('edit:', key, value);

      return dataProvider.Settings.read(key).then(function (setting) {
        // console.log('setting:', setting);
        if ( setting === null) {
          var options = {
            key : key,
            value : value
          };
          // console.log(dataProvider.Settings.create.toString());
          return dataProvider.Settings.add(options);
        } else {
          setting.set('value', value);
          return dataProvider.Settings.edit(setting).then(function (result) {
            // console.log('result:', result);
            settingsCache[_.first(result).attributes.key].value = _.first(result).attributes.value;
          });
        }
      }, errors.logAndThrowError);
    }
  };


module.exports = settings;
module.exports.updateSettingsCache = updateSettingsCache;