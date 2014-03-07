this["JST"] = this["JST"] || {};

this["JST"]["signup"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form id=\"signup\" class=\"signup-form\" method=\"post\" novalidate=\"novalidate\">\n    <div class=\"input-wrap name-wrap\">\n        <i class=\"fa fa-user\"></i>\n        <input class=\"name\" type=\"text\" placeholder=\"Full Name\" name=\"name\" autocorrect=\"off\" />\n    </div>\n    <div class=\"input-wrap email-wrap\">\n        <i class=\"fa fa-envelope-o\"></i>\n        <input class=\"email\" type=\"email\" placeholder=\"Email Address\" name=\"email\" autocapitalize=\"off\" autocorrect=\"off\" />\n    </div>\n    <div class=\"input-wrap password-wrap\">\n        <i class=\"fa fa-lock\"></i>\n        <input class=\"password\" type=\"password\" placeholder=\"Password\" name=\"password\" />\n    </div>\n    <button class=\"button-save flat full\" type=\"submit\">Sign Up</button>\n</form>\n";
  });