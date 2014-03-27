var middleware = require('../middleware').middleware;

module.exports = function (server) {
  
  server.get('/admin', middleware.auth, function (req, res) {
    res.render('dashboard');
  });



};