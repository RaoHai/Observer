var user = require('./User');

module.exports = function (sequelize, DataTypes) {

    var Project = sequelize.define('project', {
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        description: DataTypes.STRING
    });

    return Project;
};

