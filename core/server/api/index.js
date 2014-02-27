
var api = {},
settings = require('./settings'),

init;

init = function () {
  return settings.updateSettingsCache();
}

module.exports = {
  settings : settings,
  init : init
}
