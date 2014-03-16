/*global window, document, Observer, $, _, Backbone */
(function () {
    'use strict';

    Observer.Models.Training = Observer.ProgressModel.extend({

    });

    Observer.Collections.Trainings = Backbone.Collection.extend({

      url: '/trainings/',
      model: Observer.Models.Training,

    });

}());
