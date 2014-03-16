var brand    = require('../controllers/brand'),
    training = require('../controllers/training'),
    middleware = require('../middleware').middleware;

module.exports = function (server) {
  
  server.get('/admin', middleware.auth, function (req, res) {
    res.render('dashboard');
  });

  server.get('/brands', brand.listJson);

  server.get('/brands/:id/edit', middleware.auth, brand.edit);
  server.get('/brands/:id/delete', middleware.auth, brand.remove);
  
  server.post('/brands', middleware.auth, brand.create);
  
  server.post('/brands/:id/update', middleware.auth, brand.update);


  server.get('/trainings', training.listJson);
  server.get('/trainings/:id/edit', middleware.auth, training.edit);
  server.get('/trainings/:id/delete', middleware.auth, training.remove);
  
  server.post('/trainings', middleware.auth, training.create);
  
  server.post('/trainings/:id/update', middleware.auth, training.update);


};