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
    },

    edit : function edit (constraint, recent) {
        return dataProvider.Subject.read(constraint).then(function (subject) {
            var _key;
            for (_key in recent) {
                if (recent.hasOwnProperty(_key)) {
                    subject.set(_key, recent[_key]);
                }
            }

            console.log('update:', subject.toJSON());
            return dataProvider.Subject.edit(subject.toJSON()).then(function (result) {
                console.log('edit result:', result);
                return when.resolve(result.toJSON());
            });
        });
    },

    delete : function (constraint) {
        return dataProvider.Subject.findOne(constraint).then(function (subject) {
           if (subject.get('id')) {
               return dataProvider.Subject.destroy(subject.get('id'));
           }
        });
    }
};


module.exports = subjects;