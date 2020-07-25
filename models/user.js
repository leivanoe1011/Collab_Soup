


module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        user_name: {type: DataTypes.STRING, allowNull: false},
        email: {type: DataTypes.STRING(500), allowNull: false},
        password: {type: DataTypes.STRING(2000), allowNull: false}
        // , created_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
    });

    User.associate = function(models){
        // User has many Languages
        User.hasMany(models.User_language);
        User.hasMany(models.User_project);
    };

    return User;
};

