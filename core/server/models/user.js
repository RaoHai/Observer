var User,
    Users,
    _              = require('lodash'),
    when           = require('when'),
    scoutBookshelf = require('./base');



User = scoutBookshelf.Model.extend({
  
  tableName : 'users',

  permittedAttributes : [
    'id', 'name', 'password', 'email', 'image'
  ],


});


Users = scoutBookshelf.Collection.extend({
    model: User
});

module.exports = {
    User: User,
    Users: Users
};
