/*global Observer, $*/
/*login.js*/
(function () {
  'use strict';

  Observer.Views.Admin = Observer.View.extend({

    initialize: function (options) {
      var brandCollection = options.brands,
          trainingCollection = options.trainings;

      this.render();
      
      this.brandView = new Observer.Views.Brand({ el : '#brands-content', collection: brandCollection});
      this.trainingView = new Observer.Views.Training({ el : '#trainings-content', collection : trainingCollection, brands : brandCollection});
      
    },
    templateName : 'admin',
    afterRender : function () {
      console.log('afterRender')
      $(document).foundation();
    }


  });

}());