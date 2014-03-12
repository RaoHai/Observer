
var User,
  Users,
  _                 = require('lodash'),
  when              = require('when'),
  observerBookshelf = require('./base');

function validatePasswordLength(password) {
  var deferred = when.defer();
  if (password.length < 8) {
    return deferred.reject(new Error('password is too short'));
  }
  return deferred.resolve();
}

User = observerBookshelf.Model.extend({

  tableName: 'users',

  permittedAttributes: [
    'id', 'name', 'password', 'email', 'image'
  ],


}, {
  add: function(_user) {
    console.log('custom add:', _user);
    var self = this,
      userData = _.extend({}, _user);

    return validatePasswordLength(userData.password)
    .then(function (){
      // console.log('validatePasswordLength finished');

      return self.getByEmail(_user.email)
      .then(function (result) {
        return when.reject(new Error('A user is aleady registered with this Email'));
      }, function (error) {
        return observerBookshelf.Model.add.call(self, userData);

      });

    });


  },
  check: function(_user) {
    var self = this;
    return self.getByEmail(_user.email).then(function (result) {
      if (result.get('password') === _user.password) {
        return when.resolve(result.get('id'));
      }
      return when.reject(new Error('Incorrect Password'));
    }, function () {
      return when.reject(new Error('Incorrect Password'));
    });
  },

  getByEmail: function (email) {

    return Users.forge().fetch({require: true}).then(function (users) {
      var userWithEmail = users.find(function (user) {
        return user.get('email').toLowerCase() === email.toLowerCase();
      });

      if (userWithEmail) {
        return when.resolve(userWithEmail);
      }

      return when.reject(new Error('NotFound'));
    });
  },


});


Users = observerBookshelf.Collection.extend({
  model: User
});

module.exports = {
  User: User,
  Users: Users
};