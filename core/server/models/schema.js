var db = {
        users: {
            id: {type: 'increments', nullable: false, primary: true},
            name: {type: 'string', maxlength: 150, nullable: false, unique: true},
            password: {type: 'string', maxlength: 60, nullable: false},
            email: {type: 'string', maxlength: 254, nullable: false, unique: true},
            role : {type: 'string', maxlength: 10, nullable: false},
            created_at: {type: 'dateTime', nullable: false},
            updated_at: {type: 'dateTime', nullable: true},
        },

        subjects: {
            id: {type: 'increments', nullable: false, primary: true},
            name: {type: 'string', maxlength: 150, nullable: false, unique: true},
            url : {type: 'string', maxlength: 150, nullable: false},
            description: {type: 'string', maxlength: 300, nullable: true},
            created_at: {type: 'dateTime', nullable: false},
            updated_at: {type: 'dateTime', nullable: true},
        },

        concreteSubject: {
            id: {type: 'increments', nullable: false, primary: true},
            subject_id : {type: 'integer', nullable: false},
            title: {type: 'string', maxlength: 150, nullable: false},
            contents: {type: 'string'},
            created_at: {type: 'dateTime', nullable: false},
            updated_at: {type: 'dateTime', nullable: true}

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