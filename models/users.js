
module.exports = function(sequelize, DataTypes){
    var users = sequelize.define("users", {
        email: {type: DataTypes.STRING(500), allowNull: false},
        password: {type: DataTypes.STRING(2000), allowNull: false},
        created_date: {type: DataTypes.DATE, defaultValue: DataTypes.NOW}
    });

    return users;
};

