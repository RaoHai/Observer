var bcrypt = require('bcrypt-nodejs');

module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define('user', {
        username: DataTypes.STRING,
        password: { type: DataTypes.STRING, scopes: ['private'] },
        email: DataTypes.STRING,
        role: DataTypes.STRING
    }, {
        scopes : ['private', 'public'],
        instanceMethods: {
            generateHash : function (password, done) {
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(password, salt, null, done); 
                });
            },
            validPassword : function (password, next) {
                bcrypt.compare(password, this.password, next)
            }
        },
        classMethods : {
            associate: function(models) {
                User.hasMany(models.project)
            }
        }
    });

    User.hook('beforeCreate', function (model, options, done) {
        console.log("beforeCreate:", arguments);
        model.generateHash(model.password, function (err, encrypted) {
            model.password = encrypted;
            done();
        })
    });
    return User;
};

