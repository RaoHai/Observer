var Settings,
  observerBookShelf = require('./base'),
  uuid           = require('node-uuid'),
  _              = require('lodash'),
  log            = require('../../log'),
  when           = require('when');

function parseDefaultSettings() {
  var defaultSettingsInCategories = require('../data/default-settings.json'),
      defaultSettingsFlattened = {};


  _.each(defaultSettingsInCategories, function (settings, categoryName) {
      _.each(settings, function (setting, settingName) {
          setting.type = categoryName;
          setting.key = settingName;
          defaultSettingsFlattened[settingName] = setting;
      });
  });

  return defaultSettingsFlattened;
}

defaultSettings = parseDefaultSettings();

Settings = observerBookShelf.Model.extend({
  tableName : 'settings',

  permittedAttributes: ['id', 'key', 'value', 'type', 'created_at', 'created_by', 'updated_at', 'update_by'],
},{ 
  
  populateDefaults : function () {
    return this.findAll().then(function(allSettings) {
      var usedKeys = allSettings.models.map(function (setting) {
        return setting.get('key');
      }),
      insertOperations = [];

      _.each(defaultSettings, function (defaultSetting, defaultSettingKey) {
        var isMissingFromDB = usedKeys.indexOf(defaultSettingKey) === -1;

        if (defaultSettingKey === 'databaseVersion' && usedKeys.indexOf('currentVersion') !== -1) {
          isMissingFromDB = false;
        }

        if (isMissingFromDB) {
          defaultSetting.value = defaultSetting.defaultValue;
          insertOperations.push(Settings.forge(defaultSetting).save());
        }

      });

      return when.all(insertOperations);

    });
  }, 

  read: function (_key) {

    if (!_.isObject(_key)) {
        _key = { key: _key };
    }
    return observerBookShelf.Model.read.call(this, _key);
   
  },

  edit: function (_data, t) {
      var settings = this;
      if (!Array.isArray(_data)) {
          _data = [_data];
      }
      return when.map(_data, function (item) {
        // item = item.attributes;
        return settings.forge({ key: item.get('key') }).fetch({transacting: t}).then(function (setting) {
          if (setting) {
              return setting.set('value', item.get('value')).save(null, {transacting: t});
          }
          return settings.forge({ key: item.get('key'), value: item.get('value') }).save(null, {transacting: t});
        });
      });

  },
});

module.exports = {
    Settings: Settings
};

