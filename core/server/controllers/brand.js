/*globals require, console*/
var
  api    = require('../api'),
  when   = require('when'),
  fs     = require('fs'),
  path   = require('path'),
  Route  = require('express').Route,
  errors = require('../../errorHandling'),
  config = require('../config'),
  brandControllers;

brandControllers = {
  list: function(req, res) {
    res.render('brand/list');
    // api.brands.browse().then(function(brands) {
    //   res.render('brand/list', {
    //     brands: brands
    //   });
    // });
  },

  listJson : function (req, res) {
    api.brands.browse().then(function(brands) {
      res.json(brands);
    });
  },

  edit : function (req, res) {
    return api.brands.read({
      id : req.params.id
    }).then(function (brand) {
      res.render('brand/edit', {
        brand: brand
      });
    });
  },

  update : function (req, res) {

    var _brand = {
      id : req.params.id,
      name : req.body.name,
      url : req.body.url
    };

    if(req.files.image.size === 0) {
      fs.unlink(req.files.image.path);
    } else {
      _brand.image = path.basename(req.files.image.path);
    }
    return api.brands.update(_brand).then(function (brand) {
      res.redirect('back');
    });
    
  },

  create: function (req, res) {
    var image = path.basename(req.files.image.path),
      name = req.body.name,
      url = req.body.url;

    return api.brands.add({
      name: name,
      url: url,
      image: image
    }).then(function(brand) {
      res.json(brand);
      res.redirect('back');
      // res.json(200, {redirect: '/'});
    }).otherwise(function(err) {
      res.error(422, err);
    });
  },

  remove : function (req, res) {
    return api.brands.delete({
      id: req.params.id
    }).then(function () {
      res.json(200, 'successed');
    }).otherwise(function (err) {
      res.error(400, err);
    });
  }
};


module.exports = brandControllers;