var middleware = require('../middleware').middleware;

module.exports = function (server) {
  
  server.get('/admin', middleware.auth, function (req, res) {
    res.render('dashboard');
  });

  server.get('/t2', function (req, res) {
    res.render('theme2');
  });

};