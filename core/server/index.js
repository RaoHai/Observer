var express = require('express'),
  _ = require('underscore'),
  config = require('./config'),
  when = require('when');



function setup(server) {

  console.log('setup server:');
  function startGhost() {
    
  }


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