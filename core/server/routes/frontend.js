var frontend    = require('../controllers/frontend'),
    middleware = require('../middleware').middleware;


module.exports = function (server) {
    /*jslint regexp: true */

    // ### Frontend routes
    server.get('/', frontend.homepage);



    server.get('/signin/', middleware.redirectToSignup, middleware.redirectToDashboard, frontend.login);
    server.get('/signup/', middleware.redirectToDashboard, frontend.login);
};