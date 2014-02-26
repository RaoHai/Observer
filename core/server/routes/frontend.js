var frontend    = require('../controllers/frontend');


module.exports = function (server) {
    /*jslint regexp: true */

    // ### Frontend routes
    server.get('/', frontend.homepage);
};