var path = require('path'),
  when = require('when'),
  _ = require('underscore'),
  scoutConfig = {};


function config() {
  // @TODO: get rid of require statement.
  // This is currently needed for tests to load config file
  // successfully.  While running application we should never
  // have to directly delegate to the config.js file.
  if (_.isEmpty(scoutConfig)) {
    try {
      scoutConfig = require(path.resolve(__dirname, '../../../', 'config.js'))[process.env.NODE_ENV] || {};
    } catch (ignore) { /*jslint sloppy: true */ }
  }

  return scoutConfig;
}

module.exports = config;