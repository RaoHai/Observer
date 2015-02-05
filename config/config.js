var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'observer-maria'
    },
    port: 3000,
    username : 'observer-develop',
    db: 'mysql://localhost/observer-maria-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'observer-maria'
    },
    port: 3000,
    username : 'observer-develop',
    db: 'mysql://localhost/observer-maria-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'observer-maria'
    },
    port: 3000,
    username : 'observer-develop',
    db: 'mysql://localhost/observer-maria-production'
  }
};

module.exports = config[env];
