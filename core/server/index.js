var express   =   require('express'),
    _         =   require('lodash'),
    config    =   require('./config'),
    log       =   require('../log'),
    when      =   require('when');



function setup(server) {

  var runMessage = [
    'Scout is Ready !',
    "@HOST: " + config().server.host,
    "@PORT: " + config().server.port
  ];

  function startGhost() {
    
  }

  log({
    type : 'info',
    message : runMessage
  });

  server.listen(
    config().server.port,
    config().server.host,
    startGhost
  );
}


function init(app) {


  if (!app) {
    app = express();
  }
  

  setup(app);

}



module.exports = init;