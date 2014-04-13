var frontend    = require('../controllers/frontend'),
    subject     = require('../controllers/subject'),
    middleware = require('../middleware').middleware;


module.exports = function (server) {
    /*jslint regexp: true */

    // ### Frontend routes
    server.get('/', frontend.homepage);



    server.get('/signin', frontend.login);
    server.get('/signup', middleware.redirectToDashboard, frontend.signup);

    server.post('/signup', frontend.doSignup);
    server.post('/login', frontend.doLogin);


    server.get('/subjects', middleware.auth, subject.index);
    server.post('/subjects', middleware.auth, subject.save);
};