/*global Observer, $ */
/*login.js*/
(function () {
   'use strict';

    Observer.Views.Subject = Observer.View.extend({
        initialize: function () {
            console.log('observer subject view initialized');
            this.render();
        },

        templateName: 'subject',

        events: {
            "submit #subject_add_form": 'submitHandler'
        },

        afterRender : function () {
            var self = this;
            this.collection.each(function (model) {
                var row = (new Observer.Views.SubjectRow({model: model})).render();
                self.$el.find('tbody').append(row);
            });
        },

        submitHandler : function (event) {
            event.preventDefault();
            var name = this.$el.find('.name').val(),
                url = this.$el.find('.url').val(),
                description = this.$el.find('.description').val();

            Observer.Validate.clean();
            Observer.Validate.check(this.$('.name'), 'name must not null').notNull();
            Observer.Validate.check(this.$('.url'), 'url must be URL').isUrl();

            console.log(Observer.Validate._errors);
            if (Observer.Validate._errors.length > 0) {
                return Observer.Validate.handleErrors();
            }

            $.ajax({
                url : '/subjects',
                type: 'POST',
                headers: {
                    'X-CSRF-Token': $("meta[name='csrf-param']").attr('content')
                },
                data : {
                    name : name,
                    url : url,
                    description: description
                },
                success: function (msg) {
                    console.log(msg);
                },
                error: function (msg) {
                    console.log('error:', msg);
                }
            })

        }


    }) ;

    Observer.Views.SubjectRow = Observer.View.extend({
        tagName : "tr",
        templateName: "subject_row",
        events: {
            "click a.delete": "deleteHandler"
        },
        initialize: function () {
            this.render();
        },

        deleteHandler : function (event) {
            event.preventDefault();
        }
    });
})