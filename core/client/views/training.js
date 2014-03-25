/*global Observer, $, confirm, tinymce*/
/*login.js*/
(function () {
  'use strict';

  Observer.Views.Training = Observer.View.extend({
    brands: null,
    initialize: function (options) {
      if (options.brands) {
        this.brands = options.brands;
      }
      this.render();
      $('#training .csrf').val($("meta[name='csrf-param']").attr('content'));
    },

    templateName: 'training',
    events : {
      
      'submit #create_training': 'submitHandler'
    },

    afterRender : function () {
      var self = this;
      // this.render();
      this.collection.each(function (model) {
        var row = (new Observer.Views.TrainingRow({model:model})).render();
        self.$el.find('tbody').append(row);
      });
      console.log($('#brandid'));
      self.brands.each(function (brand) {
        // console.log(brand.attr('name'));
        var option = $('<option/>').val(brand.id).html(brand.get('name'));

        option.appendTo($('#brandid'));
      });

      $('#create_training').bind('opened', function () {
        console.log('opened');
        tinymce.init({
          selector: "#test-area",
          theme_url: 'js/vendor/tinymce/themes/modern/theme.min.js',
          skin_url : 'js/vendor/tinymce/skins/lightgray'
        });
      });

      $('#edit_training').bind('opened', function () {
        console.log('opened');
        tinymce.init({
          selector: "#desc",
          theme_url: 'js/vendor/tinymce/themes/modern/theme.min.js',
          skin_url : 'js/vendor/tinymce/skins/lightgray'
        });
      });
    
      
      $('.text-area-field').appendTo($('.text-area-insert-point'));

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

  var ages_map = ["","学前","幼升小","小升初","中学","大学","成人"];
  var category_map = ["","特长培训","中考","高考","考研","英语","留学","资格证考"];
  var area_map = ["","北京","天津","其他"];
  Observer.Views.TrainingRow = Observer.View.extend({
    tagName : "tr",
    templateName : "training_row",
    events : {
      "click a.delete" : 'deleteHandler'
    },

    beforeRender : function () {
      console.log(this.model);
      this.model.set('ages_string', ages_map[this.model.get('ages')]);
      this.model.set('category_string', category_map[this.model.get('category')]);
      this.model.set('area_string', area_map[this.model.get('area')]);
      
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
    },
    afterRender : function () {

    }


  });


}());