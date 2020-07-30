
module.exports = function(sequelize, DataTypes) {
    var Project_language = sequelize.define("Project_language", {
        // project_id: {type: DataTypes.INTEGER, allowNull: false, references: "project", referencesKey: "id"},
        language_name: {type: DataTypes.STRING(255), allowNull: false}
    });

    Project_language.associate = function(models){
        Project_language.belongsTo(models.Project, {foreignKey: "project_id", onDelete: "cascade"});
    };
    
    return Project_language;
};

