var User,
    Users,
    _              = require('lodash'),
    when           = require('when'),
    observerBookshelf = require('./base');



User = observerBookshelf.Model.extend({
  
  tableName : 'users',

  permittedAttributes : [
    'id', 'name', 'password', 'email', 'image'
  ],


});


Users = observerBookshelf.Collection.extend({
    model: User
});

module.exports = {
    User: User,
    Users: Users
};
