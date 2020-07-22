
module.exports = function(sequelize, DataTypes) {
    var project_languages = sequelize.define("project_languages", {
        project_id: {type: DataTypes.INTEGER, allowNull: false, references: "projects", referencesKey: "id"},
        language_name: {type: DataTypes.STRING(255), allowNull: false}
    });

    return project_languages;
};

