
var api = {},
    settings = require('./settings'),
    users = require('./user'),
    subject = require('./subject'),
    init;

init = function () {
  return settings.updateSettingsCache();
};

module.exports = {
    settings : settings,
    init : init,
    users : users,
    subject: subject
};
