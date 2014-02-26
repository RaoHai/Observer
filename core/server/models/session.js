var scoutBookshelf = require('./base'),
    Session,
    Sessions;

Session = scoutBookshelf.Model.extend({

    tableName: 'sessions',

    permittedAttributes: ['id', 'expires', 'sess'],

    saving: function () {
        // Remove any properties which don't belong on the session model
        this.attributes = this.pick(this.permittedAttributes);
    }
}, {
    destroyAll:  function (options) {
        options = options || {};
        return scoutBookshelf.Collection.forge([], {model: this}).fetch().
            then(function (collection) {
                collection.invokeThen('destroy', options);
            });
    }
});

Sessions = scoutBookshelf.Collection.extend({
    model: Session
});

module.exports = {
    Session: Session,
    Sessions: Sessions
};