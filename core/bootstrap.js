/**
 * load config file into memory~
 */

var when = require('when'),
fs = require('fs'),
  config = require('./server/config');

function loadConfig() {
  var deferred = when.defer(),
        pendingConfig;

    // Allow config file path to be taken from, in order of importance:
    // environment process, passed in value, default location
    // console.log(config());
    configFile = config().paths.config;

    /* Check for config file and copy from config.example.js
        if one doesn't exist. After that, start the server. */
    fs.exists(configFile, function checkConfig(configExists) {
        if (!configExists) {
            pendingConfig = writeConfigFile();
            deferred.reject();
        }
        deferred.resolve();

    });

    return deferred.promise;
}


module.exports = loadConfig;