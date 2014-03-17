var Brand,
  Brands,
  _                 = require('lodash'),
  when              = require('when'),
  // Trainings         = require('./training').Trainings,
  observerBookshelf = require('./base');
  

// console.log('training:', Trainings);
Brand = observerBookshelf.Model.extend({
  tableName: 'brands',
  trainings: function () {
    return this.hasMany(require('./training').Trainings, 'brand_id');
  },

}, {

  add: function(_brand) {
    var self = this,
      brandData = _.extend({}, _brand);
    // console.log('validatePasswordLength finished');

    return self.getByName(_brand.name)
      .then(function(result) {
        return when.reject(new Error('A brand is aleady registered with this Name'));
      }, function(error) {
        return observerBookshelf.Model.add.call(self, brandData);

      });


  },
   getByName: function (name) {

    return Brands.forge().fetch({require: true}).then(function (brands) {
      var brand = brands.find(function (_brand) {
        return _brand.get('name') === name;
      });

      if (brand) {
        return when.resolve(brand);
      }

      return when.reject(new Error('NotFound'));
    });
  },

  edit: function (editedPost, options) {
    var self = this;

    return observerBookshelf.Model.edit.call(this, editedPost, options).then(function (editedObj) {
      return self.findOne({id: editedObj.id}, options);
    });
  },
});


Brands = observerBookshelf.Collection.extend({
  model: Brand
});

module.exports = {
  Brand: Brand,
  Brands: Brands
};