this["JST"] = this["JST"] || {};

this["JST"]["admin"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<dl class=\"tabs\" data-tab>\n  <dd class='active'><a href='#brands-content'>品牌</a></dd>\n  <dd ><a href='#trainings-content'>培训信息</a></dd>\n</dl>\n\n\n<div class=\"tabs-content\">\n\n  <div class=\"content active\" id=\"brands-content\">\n\n  </div>\n\n  <div class=\"content\" id=\"trainings-content\">\n    \n  </div>\n\n\n</div>\n";
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
  


  return "<form id=\"signup\" class=\"signup-form\" method=\"post\" novalidate=\"novalidate\">\n    <div class=\"input-wrap name-wrap\">\n        <i class=\"fa fa-user\"></i>\n        <input class=\"name\" type=\"text\" placeholder=\"Full Name\" name=\"name\" autocorrect=\"off\" />\n        <div class=\"error\"></div>\n    </div>\n    <div class=\"input-wrap email-wrap\">\n        <i class=\"fa fa-envelope-o\"></i>\n        <input class=\"email\" type=\"email\" placeholder=\"Email Address\" name=\"email\" autocapitalize=\"off\" autocorrect=\"off\" />\n        <div class=\"error\"></div>\n    </div>\n    <div class=\"input-wrap password-wrap\">\n        <i class=\"fa fa-lock\"></i>\n        <input class=\"password\" type=\"password\" placeholder=\"Password\" name=\"password\" />\n         <div class=\"error\"></div>\n    </div>\n\n    <div class=\"thirdParty\">\n        <span>以下帐号可以直接登录:</span>\n        <ul class=\"buttons\">\n            <li><a href=\"#\" class=\"weibo\"></a></li>\n            <li><a href=\"#\" class=\"qq\"></a></li>\n            <li><a href=\"#\" class=\"renren\"></a></li>\n        </ul>\n    </div>\n    <button class=\"button-save flat full\" type=\"submit\">Sign Up</button>\n</form>\n";
  });