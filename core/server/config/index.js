/**
 * config 
 */
var path          =     require('path'),
    when          =     require('when'),
    _             =     require('lodash'),
    scoutConfig   =     {},
    appRoot       =     path.resolve(__dirname, '../../../'),
    corePath      =     path.resolve(appRoot, 'core/');

function updateConfig(config) {
  
  config = config || {};

  config.server.logLevel = config.server.logLevel || 'debug';

  _.merge(config, {
    paths : {
      config : path.join(appRoot, 'config.js')
    }
  });

  // console.log('updateConfig:', config);
  return config;

}

function config() {
  // @TODO: get rid of require statement.
  // This is currently needed for tests to load config file
  // successfully.  While running application we should never
  // have to directly delegate to the config.js file.
  process.env.NODE_ENV = process.env.NODE_ENV || 'development';
  
  if (_.isEmpty(scoutConfig)) {
    try {
      scoutConfig = require(path.resolve(__dirname, '../../../', 'config.js'))[process.env.NODE_ENV] || {};
    } catch (ignore) { /*jslint sloppy: true */ }
  }
  scoutConfig = updateConfig(scoutConfig);
  // console.log('scoutConfig', scoutConfig)
  return scoutConfig;
}



module.exports = config;