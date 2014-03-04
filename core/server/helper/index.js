/*globals process,require,module*/
var _              = require('lodash'),
    hbs            = require('express-hbs'),
    isProduction   = process.env.NODE_ENV === 'production',
    coreHelpers    = {},
    scriptTemplate = _.template('<script src="<%= source %>?v=<%= version %>"></script>'),

    registerHelpers,
    scriptFiles = {
      production : [
        'observer.min.js'
      ],
      development : [
        'vendor.js',
        'helpers.js',
        'templates.js',
        'models.js',
        'views.js'
      ]
    };

coreHelpers.ObserverScriptTags = function() {
  var scriptList = isProduction ? scriptFiles.production : scriptFiles.development;

  scriptList = _.map(scriptList, function (fileName) {
    return scriptTemplate({
      source: '/js/' + fileName,
      version: coreHelpers.assetHash
    });
  });

  return scriptList.join('');
};

function registerHelper(name, fn) {
  hbs.registerHelper(name, fn);
}

registerHelpers = function (assetHash) {
  coreHelpers.assetHash = assetHash;


  registerHelper('ObserverScriptTags', coreHelpers.ObserverScriptTags);
};

module.exports = coreHelpers;
module.exports.loadCoreHelpers = registerHelpers;