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
    
    var retval = when(api.settings.read('dbHash')).then(function (hash) {
      console.log("read hash >", hash);
    }, function (e) {
      //if dbHash not found..
      if (e.errorCode === 404) {
        var initHash = uuid.v4();
        return when(api.settings.edit('dbHash', initHash)).then(function (settings) {
            dbHash = settings.dbHash;
            return dbHash;
        }).then(doFirstRun);
      };
    }, errors.logAndThrowError);

    console.log('initDbHashAndFirstRun:', retval);
    // return when(api.settings.read('dbHash')).then(function (hash) {
    //     dbHash = hash.value;

    //     if (dbHash === null) {
    //         var initHash = uuid.v4();
    //         return when(api.settings.edit('dbHash', initHash)).then(function (settings) {
    //             dbHash = settings.dbHash;
    //             return dbHash;
    //         }).then(doFirstRun);
    //     }
    //     return dbHash.value;
    // }, errors.logAndThrowError);
}

function setup(server) {

  var runMessage = [
    'Scout is Ready !',
    "@HOST: " + config().server.host,
    "@PORT: " + config().server.port
  ];

  function startScout() {
    
  }


  middleware(server, dbHash);

  routes.frontend(server);

  models.init()
  .then(function () {
    return models.Settings.populateDefaults();
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