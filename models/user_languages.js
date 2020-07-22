
module.exports = function(sequelize, DataTypes) {
    var user_languages = sequelize.define("user_languages", {
        // Need to tie this to users table as foreign key
        user_id: {type: DataTypes.INTEGER, allowNull: false},
        language_name: {type: DataTypes.STRING(500), allowNull: false}
    });

    return user_languages;
};

