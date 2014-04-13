/*global window, document, Observer, $, _, Backbone */
(function() {
   'use strict';

    Observer.Models.Subject = Observer.ProgressModel.extend({

    });

    Observer.Collections.Subjects = Backbone.Collection.extend({
       url : '/subjects',
       model: Observer.Models.Subject
    });

}());