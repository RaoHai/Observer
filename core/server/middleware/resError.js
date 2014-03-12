module.exports = function (req, res, next) {
  
  res.error = function (statusCode, Error) {
    
    var message = Error.message || 'Some Error Occured';

    if (req.method === 'GET') {
      res.render('error', {message : message});
    } else {
      res.json(statusCode, message);
    }
  };

  next();

};