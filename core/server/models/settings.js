var Settings,
  scoutBookShelf = require('./base'),
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

Settings = scoutBookShelf.Model.extend({
  tableName : 'settings',

  permittedAttributes: ['id', 'uuid', 'key', 'value', 'type', 'created_at', 'created_by', 'updated_at', 'update_by'],
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
  }
});

module.exports = {
    Settings: Settings
};

