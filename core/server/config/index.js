/**
 * config 
 */
var path            =     require('path'),
    when            =     require('when'),
    _               =     require('lodash'),
    url             = require('url'),
    observerConfig  =     {},
    appRoot         =     path.resolve(__dirname, '../../../'),
    corePath        =     path.resolve(appRoot, 'core/');

function updateConfig(config) {
  var localPath;

  config = config || {};

  config.server.logLevel = config.server.logLevel || 'debug';
  

  config.paths = config.paths || {};

  // Parse local path location
  if (config.url) {
      localPath = url.parse(config.url).path;
      // Remove trailing slash
      if (localPath !== '/') {
          localPath = localPath.replace(/\/$/, '');
      }
  }

  subdir = localPath === '/' ? '' : localPath;

  _.merge(config, {
    paths : {
      subdir : subdir,
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
  
  if (_.isEmpty(observerConfig)) {
    try {
      observerConfig = require(path.resolve(__dirname, '../../../', 'config.js'))[process.env.NODE_ENV] || {};
    } catch (ignore) { /*jslint sloppy: true */ }
  }
  observerConfig = updateConfig(observerConfig);
  // console.log('observerConfig', observerConfig)
  return observerConfig;
}



module.exports = config;