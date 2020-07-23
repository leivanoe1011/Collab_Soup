
module.exports = function(sequelize, DataTypes) {
    var user_projects = sequelize.define("user_projects", {
        user_id: {type: DataTypes.INTEGER, allowNull: false, references: "users", referencesKey: "id"},
        project_id: {type: DataTypes.INTEGER, allowNull: false, references: "projects", referencesKey: "id"}
    });

    return user_projects;
};
