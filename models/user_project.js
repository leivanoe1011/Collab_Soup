
module.exports = function(sequelize, DataTypes) {
    var User_project = sequelize.define("User_project", {
        // If project owner = 1 
        // Not project owner = 0
        project_owner: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
    });

    User_project.associate = function(models){
        User_project.belongsTo(models.User, {onDelete: "cascade"});
        User_project.belongsTo(models.Project, {onDelete: "cascade"});
    };

    return User_project;
};
