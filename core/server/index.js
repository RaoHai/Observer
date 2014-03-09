/*global require, module*/
var     express     =   require('express'),
    crypto          =   require('crypto'),
    _               =   require('lodash'),
    hbs             =   require('express-hbs'),
    slash           =   require('express-slash'),
    uuid            =   require('node-uuid'),
    when            =   require('when'),
    path            =   require('path'),
    api             =   require('./api'),
    helper          =   require('./helper'),
    config          =   require('./config'),
    models          =   require('./models'),
    middleware      =   require('./middleware'),
    routes          =   require('./routes'),
    log             =   require('../log'),
    errors          =   require('../errorHandling'),
    packageInfo     =   require('../../package.json'),

    
    dbHash;


function initDbHashAndFirstRun() {
    return when(api.settings.read('dbHash')).then(function (hash) {
      dbHash = hash.value;
      console.log('read hash >', hash);
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
  var assetHash = (crypto.createHash('md5').update(packageInfo.version + Date.now()).digest('hex')).substring(0, 10);

  var runMessage = [
    'observer is Ready !',
    "@HOST: " + config().server.host,
    "@PORT: " + config().server.port
  ];

  function startobserver() {
    
  }

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

    middleware(server, dbHash);

    // console.log('subdir', config().paths.contentPath);
    server.use(slash());

    server.engine('hbs', hbs.express3());
    server.set('view engine', 'hbs');
    server.set('views', path.join(__dirname,"views"));
    server.use(express.static(path.join(config().paths.contentPath, "assets")));
    
    helper.loadCoreHelpers(assetHash);

    routes.frontend(server);
    

    log({
      type : 'info',
      message : runMessage
    });

    server.listen(
      config().server.port,
      config().server.host,
      startobserver
    );
  }, function (err) {
    console.log("ERROR:", err);
  });
}


function init(app) {


  if (!app) {
    app = express();
  }
  

  setup(app);

}



module.exports = init;