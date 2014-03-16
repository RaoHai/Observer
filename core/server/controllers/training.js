/*globals require, console*/
var
  api    = require('../api'),
  when   = require('when'),
  fs     = require('fs'),
  path   = require('path'),
  Route  = require('express').Route,
  errors = require('../../errorHandling'),
  config = require('../config'),
  trainingControllers;

trainingControllers = {
  list: function(req, res) {
    res.render('training/list');
    // api.trainings.browse().then(function(trainings) {
    //   res.render('training/list', {
    //     trainings: trainings
    //   });
    // });
  },

  listJson : function (req, res) {
    api.trainings.browse().then(function(trainings) {
      res.json(trainings);
    });
  },

  edit : function (req, res) {
    return when.all([
      api.trainings.read({
        id : req.params.id
      }),
      api.brands.browse()
    ]).then(function (results) {
      console.log('trainings:',results[0]);
      console.log('brands:',results[1]);
      res.render('training/edit', {
        trainings: results[0],
        brands: results[1]
      });
    });
  },

  update : function (req, res) {
    var  name = req.body.name,
      desc      = req.body.desc,
      brand_id  = req.body.brand_id,
      ages      = req.body.ages,
      category  = req.body.category,
      area      = req.body.area;

    var _training = {
      id : req.params.id,
      name: name,
      desc: desc,
      brand_id: brand_id,
      ages : ages,
      category: category,
      area: area
    };

    if(req.files.adver.size === 0) {
      fs.unlink(req.files.adver.path);
    } else {
      _training.adver = path.basename(req.files.adver.path);
    }

    return api.trainings.update(_training).then(function (training) {
      res.redirect('back');
    });
    
  },

  create: function (req, res) {
      var adver = path.basename(req.files.adver.path),
      name = req.body.name,
      desc      = req.body.desc,
      brand_id  = req.body.brand_id,
      ages      = req.body.ages,
      category  = req.body.category,
      area      = req.body.area;

    console.log(req.files);
    return api.trainings.add({
      name: name,
      desc: desc,
      brand_id: brand_id,
      ages : ages,
      category: category,
      area: area,
      adver: adver
    }).then(function(training) {
      res.json(training);
      res.redirect('back');
      // res.json(200, {redirect: '/'});
    }).otherwise(function(err) {
      res.error(422, err);
    });
  },

  remove : function (req, res) {
    return api.trainings.delete({
      id: req.params.id
    }).then(function () {
      res.json(200, 'successed');
    }).otherwise(function (err) {
      res.error(400, err);
    });
  }
};


module.exports = trainingControllers;