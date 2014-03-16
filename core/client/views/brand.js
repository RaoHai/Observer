/*global Observer, $, confirm*/
/*login.js*/
(function () {
  'use strict';

  Observer.Views.Brand = Observer.View.extend({
    initialize: function () {

      this.render();
      $('#brand .csrf').val($("meta[name='csrf-param']").attr('content'));
    },

    templateName: 'brand',
    events : {
      
      'submit #create_brand': 'submitHandler'
    },

    afterRender : function () {
      var self = this;
      // this.render();
      this.collection.each(function (model) {
        var row = (new Observer.Views.BrandRow({model:model})).render();
        self.$el.find('tbody').append(row);
      });

      $(document).foundation();
      return this;
    },

    submitHandler : function (event) {
      event.preventDefault();
       console.log(this.$('.name'))
      Observer.Validate.clean();
      Observer.Validate.check(this.$('.name'), 'name cannot be empty').notNull();
      Observer.Validate.check(this.$('.url'), 'url cannot be empty').notNull();

      if (Observer.Validate._errors.length > 0) {
        return Observer.Validate.handleErrors();
      }

      event.currentTarget.submit();
    }

  });



  Observer.Views.BrandRow = Observer.View.extend({
    tagName : "tr",
    templateName : "brand_row",
    events : {
      "click a.delete" : 'deleteHandler'
    },

    deleteHandler : function (event) {
      event.preventDefault();
      if (confirm("确认删除？")) {
        $.ajax({
          url : $(event.currentTarget).attr('href'),
          type : 'GET',
          headers : {
            'X-CSRF-Token': $("meta[name='csrf-param']").attr('content')
          },
          success : function () {
            window.location.reload();
          }
        });
      }
    }
  });


}());