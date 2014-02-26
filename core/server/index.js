var express   =   require('express'),
    _         =   require('lodash'),
    config    =   require('./config'),
    log       =   require('../log'),
    models    =   require('./models'),
    routes    =   require('./routes'),
    when      =   require('when');



function setup(server) {

  var runMessage = [
    'Scout is Ready !',
    "@HOST: " + config().server.host,
    "@PORT: " + config().server.port
  ];

  function startScout() {
    
  }
  
  routes.frontend(server);

  models.init().then(function () {
    log({
      type : 'info',
      message : runMessage
    });

    server.listen(
      config().server.port,
      config().server.host,
      startScout
    );
  });
}


function init(app) {


  if (!app) {
    app = express();
  }
  

  setup(app);

}



module.exports = init;