var express    = require('express'),
glob           = require('glob'),

favicon        = require('serve-favicon'),
logger         = require('morgan'),
cookieParser   = require('cookie-parser'),
session        = require('express-session'),
bodyParser     = require('body-parser'),
compress       = require('compression'),
resultHandle   = require('../app/middlewares').resultHandle,
methodOverride = require('method-override'),
passport       = require('passport'),
BasicStrategy  = require('passport-http').BasicStrategy,
db             = require('../app/models');

module.exports = function(app, config) {
    app.set('views', config.root + '/app/views');
    app.set('view engine', 'jade');

    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(cookieParser("askldj oa;dhijasaosdh li"));

    app.use(passport.initialize());
    app.use(passport.session());
    
    app.use(compress());
    app.use(express.static(config.root + '/public'));
    app.use(methodOverride());

    app.use(session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true
    }))

    app.use(resultHandle);

    app.use(function (req, res, next) {
        if (req.session && req.session.user) {
            res.locals.user = req.session.user;
        }
        next();
    });

    var controllers = glob.sync(config.root + '/app/controllers/*.js');
    controllers.forEach(function (controller) {
        require(controller)(app);
    });

    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    if(app.get('env') === 'development'){
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err,
                title: 'error'
            });
        });
    }

    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {},
            title: 'error'
        });
    });

    passport.use(new BasicStrategy(
      function(username, password, done) {
        // console.log(">> BasicStrategy:", username, password);
        db.user.find({ where : { username: username } }).then(function (user) {
            console.log("find result:", user);
            done(null, user);
        }, function (err) {
            done(err);
        });
    }
    ));


};
