this["JST"] = this["JST"] || {};

this["JST"]["admin"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<dl class=\"tabs\" data-tab>\r\n  <dd class='active'><a href='#brands-content'>品牌</a></dd>\r\n  <dd ><a href='#trainings-content'>培训信息</a></dd>\r\n</dl>\r\n\r\n\r\n<div class=\"tabs-content\">\r\n\r\n  <div class=\"content active\" id=\"brands-content\">\r\n\r\n  </div>\r\n\r\n  <div class=\"content\" id=\"trainings-content\">\r\n    \r\n  </div>\r\n\r\n\r\n</div>\r\n";
  });

this["JST"]["brand"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"row\">\r\n    <div class=\"columns large-12\">\r\n        <button data-reveal-id=\"create_brand\" >\r\n            添加品牌\r\n        </button>\r\n    </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"columns large-12\">\r\n  <table class='full-width'>\r\n    <thead>\r\n      <tr>\r\n        <th>#</th>\r\n        <th>品牌名</th>\r\n        <th>url</th>\r\n        <th>图标</th>\r\n        <th>action</th>\r\n      </tr>\r\n    </thead>\r\n    <tbody>\r\n    \r\n    </tbody>\r\n  </table>\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n<div id=\"create_brand\" class=\"reveal-modal\" data-reveal>\r\n  <h2>添加品牌</h2>\r\n  <div class=\"brand-box\">\r\n  <form id=\"brand\" action='/brands' class=\"brand-form\" method=\"post\" novalidate=\"novalidate\" enctype=\"multipart/form-data\">\r\n    <input type=\"hidden\" name=\"_csrf\" class='csrf'> \r\n    <div class=\"input-wrap email-wrap\">\r\n        <input class=\"name\" type=\"text\" placeholder=\"品牌名称\" name=\"name\" autocapitalize=\"off\" autocorrect=\"off\">\r\n        <div class=\"error\"></div>\r\n    </div>\r\n    <div class=\"input-wrap url-wrap\">\r\n        <input class=\"url\" type=\"text\" placeholder=\"品牌网址\" name=\"url\">\r\n        <div class=\"error\"></div>\r\n    </div>\r\n\r\n    <div class=\"input-wrap image-wrap\">\r\n        <label for=\"file\">选择品牌商标：</label>\r\n        <input id='file' type=\"file\" name=\"image\">\r\n        <div class=\"error\"></div>\r\n    </div>\r\n\r\n    <button class=\"button-save flat full\" type=\"submit\">提交</button>\r\n\r\n</form>\r\n\r\n  </div>\r\n   <a class=\"close-reveal-modal\">&#215;</a>\r\n</div>\r\n\r\n<div id=\"edit_brand\" class=\"reveal-modal\" data-reveal>\r\n</div>";
  });

this["JST"]["brand_row"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td>"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>"
    + escapeExpression(((stack1 = (depth0 && depth0.url)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td><img src=\"/uploads/"
    + escapeExpression(((stack1 = (depth0 && depth0.image)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" alt=\"\" class='height-fix'></td>\r\n<td>\r\n  <a class='button tiny' href=\"/brands/"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/edit\" data-reveal-id=\"edit_brand\" data-reveal-ajax=\"true\">\r\n    编辑\r\n  </a>\r\n  <a href=\"/brands/"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/delete\" class=\"button tiny alert delete\">删除</a>\r\n</td>\r\n";
  return buffer;
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

this["JST"]["training"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"row\">\r\n  <div class=\"columns large-12\">\r\n    <button data-reveal-id=\"create_training\" >\r\n      添加培训信息\r\n    </button>\r\n  </div>\r\n</div>\r\n<div class=\"row\">\r\n  <div class=\"columns large-12\">\r\n    <table class='full-width'>\r\n      <thead>\r\n        <tr>\r\n          <th>#</th>\r\n          <th>培训名称</th>\r\n          <th>描述</th>\r\n          <th>培训图片</th>\r\n          <th>年龄段</th>\r\n          <th>培训类型</th>\r\n          <th>培训地区</th>\r\n          <th>action</th>\r\n        </tr>\r\n      </thead>\r\n      <tbody>\r\n\r\n      </tbody>\r\n    </table>\r\n\r\n  </div>\r\n</div>\r\n\r\n\r\n<div id=\"create_training\" class=\"reveal-modal\" data-reveal>\r\n  <h2>添加培训信息</h2>\r\n  <div class=\"training-box\">\r\n    <form id=\"training\" action='/trainings' class=\"training-form\" method=\"post\" novalidate=\"novalidate\" enctype=\"multipart/form-data\">\r\n      <input type=\"hidden\" name=\"_csrf\" class='csrf'> \r\n      <div class=\"row\">\r\n        <div class=\"columns large-12\">\r\n          <div class=\"input-wrap email-wrap\">\r\n            <input class=\"name\" type=\"text\" placeholder=\"培训名称\" name=\"name\" autocapitalize=\"off\" autocorrect=\"off\">\r\n            <div class=\"error\"></div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"columns large-12\">\r\n          <div class=\"input-wrap image-wrap\">\r\n            <label for=\"file\">选择培训图片：</label>\r\n            <input id='file' type=\"file\" name=\"adver\">\r\n            <div class=\"error\"></div>\r\n        </div>\r\n\r\n        </div>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"columns large-6\">\r\n\r\n          <div class=\"input-wrap brand-wrap\">\r\n            <label for=\"file\">选择培训品牌：</label>\r\n            <select name=\"brand_id\" id=\"brandid\">\r\n\r\n            </select>\r\n            <div class=\"error\"></div>\r\n          </div>\r\n        </div>\r\n        <div class=\"columns large-6\">\r\n          <div class=\"input-wrap age-wrap\">\r\n            <label for=\"ages\">选择培训年龄段：</label>\r\n            <select name=\"ages\" id=\"ages\">\r\n              <option value='1'>学前</option>\r\n              <option value='2'>幼升小</option>\r\n              <option value='3'>小升初</option>\r\n              <option value='4'>中学</option>\r\n              <option value='5'>大学</option>\r\n              <option value='6'>成人</option>\r\n            </select>\r\n            <div class=\"error\"></div>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n\r\n      <div class=\"row\">\r\n        <div class=\"columns large-6\">\r\n          <div class=\"input-wrap age-wrap\">\r\n            <label for=\"category\">选择培训类型：</label>\r\n            <select name=\"category\" id=\"category\">\r\n              \r\n              <option value=\"1\">特长培训</option>\r\n              <option value=\"2\">中考</option>\r\n              <option value=\"3\">高考</option>\r\n              <option value=\"4\">考研</option>\r\n              <option value=\"5\">英语</option>\r\n              <option value=\"6\">留学</option>\r\n              <option value=\"7\">资格证考</option>\r\n            </select>\r\n            <div class=\"error\"></div>\r\n          </div>\r\n        </div>\r\n\r\n        <div class=\"columns large-6\">\r\n          <div class=\"input-wrap age-wrap\">\r\n            <label for=\"area\">选择培训类型：</label>\r\n            <select name=\"area\" id=\"area\">\r\n              \r\n              <option value=\"1\">北京</option>\r\n              <option value=\"2\">天津</option>\r\n              <option value=\"3\">其他</option>\r\n\r\n            </select>\r\n            <div class=\"error\"></div>\r\n          </div>\r\n        </div>\r\n\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"columns large-12\">\r\n        <label for=\"desc\"> 描述信息： </label>\r\n          <textarea name=\"desc\" id=\"desc\" class='fixed-size'></textarea>\r\n        </div>\r\n      </div>\r\n\r\n\r\n\r\n\r\n      <button class=\"button-save flat full\" type=\"submit\">提交</button>\r\n\r\n    </form>\r\n\r\n  </div>\r\n  <a class=\"close-reveal-modal\">&#215;</a>\r\n</div>\r\n\r\n<div id=\"edit_training\" class=\"reveal-modal\" data-reveal>\r\n</div>";
  });

this["JST"]["training_row"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<td>"
    + escapeExpression(((stack1 = ((stack1 = data),stack1 == null || stack1 === false ? stack1 : stack1.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>"
    + escapeExpression(((stack1 = (depth0 && depth0.name)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>"
    + escapeExpression(((stack1 = (depth0 && depth0.desc)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td><img src=\"/uploads/"
    + escapeExpression(((stack1 = (depth0 && depth0.adver)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class='height-fix'></td>\r\n<td>"
    + escapeExpression(((stack1 = (depth0 && depth0.ages_string)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>"
    + escapeExpression(((stack1 = (depth0 && depth0.category_string)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>"
    + escapeExpression(((stack1 = (depth0 && depth0.area_string)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</td>\r\n<td>\r\n  <a class='button tiny' href=\"/trainings/"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/edit\" data-reveal-id=\"edit_training\" data-reveal-ajax=\"true\">\r\n    编辑\r\n  </a>\r\n  <a href=\"/trainings/"
    + escapeExpression(((stack1 = (depth0 && depth0.id)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "/delete\" class=\"button tiny alert delete\">删除</a>\r\n</td>\r\n";
  return buffer;
  });