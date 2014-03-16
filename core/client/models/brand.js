/*global window, document, Observer, $, _, Backbone */
(function () {
    'use strict';

    Observer.Models.Brand = Observer.ProgressModel.extend({

    });

    Observer.Collections.Brands = Backbone.Collection.extend({

      url: '/brands/',
      model: Observer.Models.Brand,

    });

}());
