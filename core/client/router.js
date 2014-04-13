/*global  Observer, Backbone */
(function () {
    'use strict';

    Observer.Router = Backbone.Router.extend({
        routes: {
            '': 'index',
            'subject': 'subject',
            'signup\/*': 'signup',
            'signin\/*': 'login',
            'admin\/*': 'admin'
        },

        signup: function () {
            Observer.currentView = new Observer.Views.Signup({ el: '.signup-box'});
        },

        login: function () {
            Observer.currentView = new Observer.Views.Login({ el: '.login-box'});
        },

        subject: function () {

        },

        index: function () {
            Observer.currentView = new Observer.Views.Signup({ el: '.signup-box'});
        },

        subjects: function () {
            Observer.currentView = new Observer.Views.Subject({ el: '.subject-box'});
        },

        admin: function () {
            var subjects = new Observer.Collections.Subjects();

            subjects.fetch().then(function (){

                Observer.currentView = new Observer.Views.Admin({ el : '.subjects-list' ,subjects: subjects});
            });

        }

    });
}());