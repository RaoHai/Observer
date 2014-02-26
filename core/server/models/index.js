var _ = require('lodash'),
  when = require('when');

module.exports = {
  User: require('./user').User,
  Session: require('./session').Session,
  
  init : function () {
    var deferred = when.defer();
    deferred.resolve();
    return deferred.promise;
  }
}