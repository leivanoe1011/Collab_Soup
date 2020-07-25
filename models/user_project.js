
module.exports = function(sequelize, DataTypes) {
    var User_project = sequelize.define("User_project", {
        // user_id: {type: DataTypes.INTEGER, allowNull: false, references: "users", referencesKey: "id"},
        // project_id: {type: DataTypes.INTEGER, allowNull: false, references: "projects", referencesKey: "id"}
    });

    User_project.associate = function(models){
        User_project.belongsTo(models.User, {foreignKey: "user_id", onDelete: "cascade"});
        User_project.belongsTo(models.Project, {foreignKey: "project_id", onDelete: "cascade"});
    };

    return User_project;
};
