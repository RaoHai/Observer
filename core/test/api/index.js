var
    assert = require('assert') ,
    path = require('path'),
    should = require('should'),
    api = require('../../server/api/index'),
    config = require('../../server/config/index'),
    model = require('../../server/models/index'),
    fs = require('fs');

module.exports = function done (done) {
    var databasePath = path.join(config().paths.contentPath, 'data', 'observer-test.db');
    fs.exists(databasePath, function() {
        fs.unlink(databasePath, function (err){
            if (err) {
                // console.log(err);
            }
            model.init().then(done);
        });
    });
};
