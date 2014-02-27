var express     =   require('express'),
    _           =   require('lodash'),
    api         =   require('./api'),
    config      =   require('./config'),
    log         =   require('../log'),
    uuid        =   require('node-uuid'),
    models      =   require('./models'),
    errors      =   require('../errorHandling'),
    middleware  =   require('./middleware'),
    routes      =   require('./routes'),
    when        =   require('when'),


    dbHash;


function initDbHashAndFirstRun() {
    return when(api.settings.read('dbHash')).then(function (hash) {
      dbHash = hash.value;
      console.log("read hash >", dbHash);
    }, function (e) {
      //if dbHash not found..
      console.log('dbHash not found');
      if (e.errorCode === 404) {
        var initHash = uuid.v4();
        return when(api.settings.edit('dbHash', initHash)).then(function (_dbHash) {
          dbHash = _dbHash;
          return dbHash;
        });
      };
    }, errors.logAndThrowError);
}

function setup(server) {

  var runMessage = [
    'observer is Ready !',
    "@HOST: " + config().server.host,
    "@PORT: " + config().server.port
  ];

  function startobserver() {
    
  }


  middleware(server, dbHash);

  routes.frontend(server);

  models.init()
  .then(function () {
    return models.Settings.populateDefaults();
  })
  .then(function () {
    return api.init();
  })
  .then(function () {
    return initDbHashAndFirstRun();
  })
  .then(function () {
    log({
      type : 'info',
      message : runMessage
    });

    server.listen(
      config().server.port,
      config().server.host,
      startobserver
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