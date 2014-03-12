var db = {
        users: {
            id: {type: 'increments', nullable: false, primary: true},
            name: {type: 'string', maxlength: 150, nullable: false, unique: true},
            password: {type: 'string', maxlength: 60, nullable: false},
            email: {type: 'string', maxlength: 254, nullable: false, unique: true},
            created_at: {type: 'dateTime', nullable: false},
            updated_at: {type: 'dateTime', nullable: true},
        },

        targets : {
            id: {type: 'increments', nullable: false, primary: true},
            name: {type : 'string', maxlength: 150, nullable: false},
            url: {type: 'string', maxlength: 300, nullable: false},
            description: {type: 'string', maxlength:300, nullable:true},
            period: {type: 'string', maxlength:10, nullable:false},
            created_at: {type: 'dateTime', nullable: false},
            updated_at: {type: 'dateTime', nullable: true},
            user: {type: 'integer', nullable:false}
        },

        settings: {
            id: {type: 'increments', nullable: false, primary: true},
            key: {type: 'string', maxlength: 150, nullable: false, unique: true},
            value: {type: 'text', maxlength: 65535, nullable: true},
            defaultValue: {type: 'text', maxlength: 65535, nullable: true},
            type: {type: 'string', maxlength: 150, nullable: false, defaultTo: 'core'},
            created_at: {type: 'dateTime', nullable: false},
            updated_at: {type: 'dateTime', nullable: true},
        }
    };

function isPost(jsonData) {
    return jsonData.hasOwnProperty('html') && jsonData.hasOwnProperty('markdown')
        && jsonData.hasOwnProperty('title') && jsonData.hasOwnProperty('slug');
}

module.exports.tables = db;
module.exports.checks = {
    isPost: isPost
};