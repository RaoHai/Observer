
var api = {},
settings = require('./settings'),
users = require('./user'),
init;

init = function () {
  return settings.updateSettingsCache();
};

module.exports = {
  settings : settings,
  init : init,
  users : users
};
