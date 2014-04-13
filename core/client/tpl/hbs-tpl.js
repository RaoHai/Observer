this["JST"] = this["JST"] || {};

this["JST"]["admin"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "\n";
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

this["JST"]["subject"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"row\">\r\n    <div class=\"columns large-12\">\r\n        <button class='flat small' data-reveal-id=\"subject_add\" data-reveal>+ Add Subject</button>\r\n    </div>\r\n</div>\r\n<div class=\"row\">\r\n    <div class=\"columns large-12\">\r\n        <table class=\"full-width\">\r\n            <thead>\r\n            <tr>\r\n                <th>#</th>\r\n                <th>Name</th>\r\n                <th>Url</th>\r\n                <th>Description</th>\r\n                <th>Action</th>\r\n            </tr>\r\n            </thead>\r\n            <tbody>\r\n\r\n            </tbody>\r\n        </table>\r\n    </div>\r\n</div>\r\n\r\n<div id=\"subject_add\" class=\"reveal-modal\" data-reveal>\r\n    <h2>Add Subject</h2>\r\n\r\n    <div class=\"subject-box\">\r\n\r\n        <form action=\"\" id=\"subject_add_form\">\r\n            <input type=\"hidden\" name=\"_csrf\" class=\"csrf\"/>\r\n\r\n            <div class=\"row\">\r\n                <div class=\"columns large-12\">\r\n                    <div class=\"input-wrap name-wrap\">\r\n                        <input type=\"text\" class=\"name\" name=\"name\" placeholder=\"Subject Name\" autocapitalize=\"off\"\r\n                               autocorrect=\"off\"/>\r\n\r\n                        <div class=\"error\"></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <div class=\"columns large-12\">\r\n                    <div class=\"input-wrap url-wrap\">\r\n                        <input type=\"text\" class=\"url\" name=\"url\" placeholder=\"Subject url\" autocapitalize=\"off\"\r\n                               autocorrect=\"off\"/>\r\n\r\n                        <div class=\"error\"></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n\r\n            <div class=\"row\">\r\n                <div class=\"columns large-12\">\r\n                    <div class=\"input-wrap description-wrap\">\r\n                        <input type=\"text\" class=\"description\" name=\"description\" placeholder=\"Subject description\"\r\n                               autocapitalize=\"off\" autocorrect=\"off\"/>\r\n\r\n                        <div class=\"error\"></div>\r\n                    </div>\r\n                </div>\r\n            </div>\r\n            <div class=\"row\">\r\n                <div class=\"columns large-12\">\r\n                    <button class=\"button save flat full\" type=\"submit\">Submit</button>\r\n                </div>\r\n            </div>\r\n        </form>\r\n\r\n    </div>\r\n</div>";
  });

this["JST"]["subject_row"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td>"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>"
    + escapeExpression(((stack1 = (depth0 && depth0.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>"
    + escapeExpression(((stack1 = (depth0 && depth0.description)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>\r\n    <a class='button tiny' href=\"/subjects/"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/edit\" data-reveal-id=\"edit_brand\" data-reveal-ajax=\"true\">\r\n        Edit\r\n    </a>\r\n    <a href=\"/subjects/"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/delete\" class=\"button tiny alert delete\">Delete</a>\r\n</td>";
  return buffer;
  });