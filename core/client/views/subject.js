/*global Observer, $ */
/*login.js*/
(function () {
   'use strict';

    Observer.Views.Subject = Observer.View.extend({
        initialize: function () {
            this.render();
        },

        templateName: 'subject',

        events: {

        }
    }) ;
});