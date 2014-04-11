var when = require('when'),
    _ = require('lodash'),
    dataProvider = require('../models'),
//    subjects = require('./')
    subjects;

subjects = {
    read : function read(args) {

        return dataProvider.Subject.read(args).then(function (result) {
            if (result) {
               return result.toJSON();
            }
            return when.reject({errorCode: 404, message: 'Subject not found'});

        });
    },


    add : function add(subjectData) {
        return dataProvider.Subject.add(subjectData);
    },

    browse : function browe (options) {
        return dataProvider.Subject.browse(options).then(function(result) {
            return result.toJSON();
        });
    }
};


module.exports = subjects;