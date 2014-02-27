  var _        = require('lodash'),
  dataProvider = require('../models'),
  when         = require('when'),
  log          = require('../../log'),
  config       = require('../config'),
  errors       = require('../../errorHandling'),
  settings,
  settingsObject,
  settingsCollection,
  readSettingsResult,
  settingsCache = {}

  readSettingsResult = function (result) {
   return when(_.map(result.models, function (member) {
      if (!settings.hasOwnProperty(member.attributes.key)) {
          var val = {};
          val.value = member.attributes.value;
          val.type = member.attributes.type;
          settings[member.attributes.key] = val;
          return val;
      }
    })).then(function () {
      return settings;
    });
  };

  updateSettingsCache = function (settings) {
    // console.log('updateSettingsCache....', settings);
      settings = settings || {};

      if (!_.isEmpty(settings)) {
          _.map(settings, function (setting, key) {
              settingsCache[key].value = setting.value;
          });
      } else {
          return when(dataProvider.Settings.findAll()).then(function (result) {
              return when(readSettingsResult(result)).then(function (s) {
                // console.log('settingsCache:', s);
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
            var deferred = when.defer();
            if (!setting) {
                return when.reject({errorCode: 404, message: 'Unable to find setting: ' + options.key});
            }
            var res = {};
            res.key = options.key;
            res.value = setting.value;
            deferred.resolve(res);
            return deferred.promise;

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
            var deferred = when.defer();
            var _key = _.first(result).get('key');
            if (!settingsCache[_key]) {
              settingsCache[_key] = {}
            }
            settingsCache[_key].value = _.first(result).get('value');
            console.log('value->:',settingsCache[_key]);
            deferred.resolve(_.first(result).get('value'));
            return deferred.promise;
            // settingsCache[_.first(result).attributes.key].value = _.first(result).attributes.value;
          });

        }
      });
    }
  };


module.exports = settings;
module.exports.updateSettingsCache = updateSettingsCache;