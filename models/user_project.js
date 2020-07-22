
module.exports = function(sequelize, DataTypes) {
    var user_projects = sequelize.define("user_projects", {
        user_id: {type: DataTypes.INTEGER, allowNull: false},
        project_id: {type: DataTypes.INTEGER, allowNull: false}
    });

    return user_projects;
};
