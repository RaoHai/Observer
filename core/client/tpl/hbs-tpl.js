this["JST"] = this["JST"] || {};

this["JST"]["admin"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<dl class=\"tabs\" data-tab>\r\n  <dd class='active'><a href='#brands-content'>品牌</a></dd>\r\n  <dd ><a href='#trainings-content'>培训信息</a></dd>\r\n</dl>\r\n\r\n\r\n<div class=\"tabs-content\">\r\n\r\n  <div class=\"content active\" id=\"brands-content\">\r\n\r\n  </div>\r\n\r\n  <div class=\"content\" id=\"trainings-content\">\r\n    \r\n  </div>\r\n\r\n\r\n</div>\r\n";
  });

this["JST"]["login"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<form id=\"login\" class=\"login-form\" method=\"post\" novalidate=\"novalidate\">\r\n    <div class=\"input-wrap email-wrap\">\r\n        <i class=\"fa fa-envelope-o\"></i>\r\n        <input class=\"email\" type=\"email\" placeholder=\"Email Address\" name=\"email\" autocapitalize=\"off\" autocorrect=\"off\">\r\n        <div class=\"error\"></div>\r\n    </div>\r\n    <div class=\"input-wrap password-wrap\">\r\n        <i class=\"fa fa-lock\"></i>\r\n        <input class=\"password\" type=\"password\" placeholder=\"Password\" name=\"password\">\r\n        <div class=\"error\"></div>\r\n    </div>\r\n    <button class=\"button-save flat full\" type=\"submit\">Log in</button>\r\n    <section class=\"meta\">\r\n        <a class=\"forgotten-password\" href=\"";
  if (stack1 = helpers.adminUrl) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = (depth0 && depth0.adminUrl); stack1 = typeof stack1 === functionType ? stack1.call(depth0, {hash:{},data:data}) : stack1; }
  buffer += escapeExpression(stack1)
    + "/forgotten/\">Forgotten password?</a>\r\n    </section>\r\n</form>\r\n";
  return buffer;
  });

this["JST"]["signup"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<form id=\"signup\" class=\"signup-form\" method=\"post\" novalidate=\"novalidate\">\r\n    <div class=\"input-wrap name-wrap\">\r\n        <i class=\"fa fa-user\"></i>\r\n        <input class=\"name\" type=\"text\" placeholder=\"Full Name\" name=\"name\" autocorrect=\"off\" />\r\n        <div class=\"error\"></div>\r\n    </div>\r\n    <div class=\"input-wrap email-wrap\">\r\n        <i class=\"fa fa-envelope-o\"></i>\r\n        <input class=\"email\" type=\"email\" placeholder=\"Email Address\" name=\"email\" autocapitalize=\"off\" autocorrect=\"off\" />\r\n        <div class=\"error\"></div>\r\n    </div>\r\n    <div class=\"input-wrap password-wrap\">\r\n        <i class=\"fa fa-lock\"></i>\r\n        <input class=\"password\" type=\"password\" placeholder=\"Password\" name=\"password\" />\r\n         <div class=\"error\"></div>\r\n    </div>\r\n\r\n    <div class=\"thirdParty\">\r\n        <span>以下帐号可以直接登录:</span>\r\n        <ul class=\"buttons\">\r\n            <li><a href=\"#\" class=\"weibo\"></a></li>\r\n            <li><a href=\"#\" class=\"qq\"></a></li>\r\n            <li><a href=\"#\" class=\"renren\"></a></li>\r\n        </ul>\r\n    </div>\r\n    <button class=\"button-save flat full\" type=\"submit\">Sign Up</button>\r\n</form>\r\n";
  });