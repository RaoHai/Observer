var config = require('./server/config'),
  colors = require( "colors"),
  _ = require('lodash');

colors.setTheme({
  prompt: 'grey',
  info: 'green',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});

function log(options) {

  var filterlevel = config().server.logLevel,

  levels = {
    'error' : {weight : 1000, color : 'error'},
    'info': { weight : 100, color : 'info'},
    'debug' : {weight : 10, color : 'debug'},
    'warnning' : {weight : 1, color : 'warn'},
  },

  filterWeight = levels[filterlevel].weight,

  logLevel = options.type || 'debug',

  logWeight = levels[logLevel].weight,

  colorfunction, message;

  
  if (logWeight < filterWeight) {
    return;
  }

  colorfunction = levels[logLevel].color;

  var message;
  if (options.message.stack) {
    console.log(("[" + logLevel + "]").toUpperCase()[colorfunction] + " " + options.message.stack);
  } else {
    options.message = options.message.length ? options.message : [options.message];
    _.forEach(options.message, function (line) {
      var m = ("[" + logLevel + "]").toUpperCase()[colorfunction] + " " + line;
      console.log(m);
    });
  }

  // console.log(options.message);
  // message = options.message.join('\n');
  // console.log(message[colorfunction]);

  // .call(colorfunction);

  
}


module.exports = log;