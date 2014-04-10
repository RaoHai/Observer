var Subject,
    Subjects,
    _ = require('lodash'),
    when = require('when'),
    nodefn = require('when/node/function'),
    observerBookshelf = require('./base');

Subject = observerBookshelf.Model.extend({
    tableName: 'subjects'
}, {
    add: function(_subject) {
      var self = this,
      subjectData = _.extend({}, _subject);

      return self.getByName(_subject.name)
          .then(function (result) {
              console.log('result:', result);
              return when.reject(new Error('A subject is already saved'));
          }, function (error) {
              return observerBookshelf.Model.add.call(self, subjectData);
          });
    },

    getByName: function (name) {
        var self = this;
        return self.findOne({name : name}).then(function (subject) {
            if (subject) {
                return when.resolve(subject);
            }

            return when.reject(new Error('NotFound'));
        });
    }
});


Subjects = observerBookshelf.Collection.extend({
    model: Subject
});

module.exports = {
    Subject: Subject,
    Subjects: Subjects
};



