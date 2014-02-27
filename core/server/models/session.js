var observerBookshelf = require('./base'),
    Session,
    Sessions;

Session = observerBookshelf.Model.extend({

    tableName: 'sessions',

    permittedAttributes: ['id', 'expires', 'sess'],

    saving: function () {
        // Remove any properties which don't belong on the session model
        this.attributes = this.pick(this.permittedAttributes);
    }
}, {
    destroyAll:  function (options) {
        options = options || {};
        return observerBookshelf.Collection.forge([], {model: this}).fetch().
            then(function (collection) {
                collection.invokeThen('destroy', options);
            });
    }
});

Sessions = observerBookshelf.Collection.extend({
    model: Session
});

module.exports = {
    Session: Session,
    Sessions: Sessions
};