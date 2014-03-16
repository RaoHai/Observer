
var api = {},
settings = require('./settings'),
users = require('./user'),
brands = require('./brand'),
trainings = require('./training'),
init;

init = function () {
  return settings.updateSettingsCache();
};

module.exports = {
  settings : settings,
  init : init,
  users : users,
  brands: brands,
  trainings : trainings
};
