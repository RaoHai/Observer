/*global window, document, setTimeout, Ghost, $, _, Backbone, JST, shortcut, NProgress */

(function () {
    "use strict";

    // Adds in a call to start a loading bar
    // This is sets up a success function which completes the loading bar
    function wrapSync(method, model, options) {
        if (options !== undefined && _.isObject(options)) {

            var self = this,
                oldSuccess = options.success;

            options.success = function () {
                return oldSuccess.apply(self, arguments);
            };
        }

        return Backbone.sync.call(this, method, model, options);
    }

    Observer.ProgressModel = Backbone.Model.extend({
        sync: wrapSync
    });

    Observer.ProgressCollection = Backbone.Collection.extend({
        sync: wrapSync
    });
}());