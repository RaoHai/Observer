var fs = require('fs'),
path = require('path'),
Sequelize = require('sequelize'),
config = require('../../config/config'),
db = {};

var sequelize = new Sequelize('observer-maria-development', 'observer-develop','', {
    dialect: 'mysql',
    port: 3306
});

fs.readdirSync(__dirname).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
}).forEach(function (file) {
    var model = sequelize['import'](path.join(__dirname, file));
    console.log("import:", model.name);
    db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
