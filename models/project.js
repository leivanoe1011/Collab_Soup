
module.exports = function(sequelize, DataTypes) {
    var Project = sequelize.define("Project", {
        project_name: {type: DataTypes.STRING(500), allowNull: false},
        project_description: {type: DataTypes.STRING(2000), allowNull: false}
    });

    Project.associate = function(models){
        Project.hasMany(models.Project_language);
        Project.hasMany(models.User_project);
    };

    return Project;
}