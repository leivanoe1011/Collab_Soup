
module.exports = function(sequelize, DataTypes) {
    var User_language = sequelize.define("User_language", {
        // Need to tie this to users table as foreign key
        // user_id: {type: DataTypes.INTEGER, allowNull: false, references: "users", referenceKey: "id"},
        language_name: {type: DataTypes.STRING(500), allowNull: false}
    });

    User_language.associate = function(models){
        // User_language belongs to User
        // User_language.belongsTo(models.User, {foreignKey: "user_id", onDelete: "cascade"});
        User_language.belongsTo(models.User, {onDelete: "cascade"});
    };

    return User_language;
};