
module.exports = function(sequelize, DataTypes) {
    var projects = sequelize.define("projects" {
        project_name: {type: DataTypes.STRING(500), allowNull: false},
        project_description: {type: DataTypes.STRING(2000), allowNull: false}
    });

    return projects;
}