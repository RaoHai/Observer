  var Training,
  Trainings,
  _                 = require('lodash'),
  when              = require('when'),
  observerBookshelf = require('./base');

Training = observerBookshelf.Model.extend({
  tableName: 'trainings',
}, {

  add: function(_training) {
    var self = this,
      trainingData = _.extend({}, _training);
    // console.log('validatePasswordLength finished');

    return self.getByName(_training.name)
      .then(function(result) {
        return when.reject(new Error('A training is aleady registered with this Name'));
      }, function(error) {
        return observerBookshelf.Model.add.call(self, trainingData);

      });


  },
   getByName: function (name) {

    return Training.forge().fetch({require: true}).then(function (trainings) {
      var training = trainings.find(function (_training) {
        return _training.get('name') === name;
      });

      if (training) {
        return when.resolve(training);
      }

      return when.reject(new Error('NotFound'));
    });
  },

  edit: function (editedPost, options) {
    var self = this;

    return observerBookshelf.Model.edit.call(this, editedPost, options).then(function (editedObj) {
      return self.findOne({id: editedObj.id}, options);
    });
  },
});


Trainings = observerBookshelf.Collection.extend({
  model: Training
});

module.exports = {
  Training: Training,
  Trainings: Trainings
};