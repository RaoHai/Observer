/*global Observer, $*/
/*login.js*/
(function () {
  'use strict';

  Observer.Views.Admin = Observer.View.extend({

    initialize: function (options) {
      var subjectCollection = options.subjects;

      this.render();
      
      this.subjectView = new Observer.Views.Subject({ el : '.subjects-list', collection: subjectCollection});

      
    },
    templateName : 'admin',
    afterRender : function () {
      console.log('afterRender')
      $(document).foundation();
    }


  });

}());