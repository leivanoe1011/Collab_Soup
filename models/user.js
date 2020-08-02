module.exports = function(sequelize, DataTypes){

    var User = sequelize.define("User", {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
 
        firstname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
 
        lastname: {
            type: DataTypes.STRING,
            notEmpty: true
        },
 
        username: {
            type: DataTypes.TEXT
        },
 
        about: {
            type: DataTypes.TEXT
        },
 
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
 
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
 
        last_login: {
            type: DataTypes.DATE
        },
 
        status: {
            type: DataTypes.ENUM('active', 'inactive'),
            defaultValue: 'active'
        },

        picture: {type: DataTypes.STRING(2000), allowNull:true, defaultValue: "https://miro.medium.com/max/1932/1*DW3-mBLhOOAFIFUVYUkgsQ.png"},
        github: {type: DataTypes.STRING(2000), allowNull:true, defaultValue: " "},
        linkedin: {type: DataTypes.STRING(2000), allowNull:true, defaultValue: " "}
    });


    User.associate = function(models){
        // User has many Languages
        User.hasMany(models.User_language);
        User.hasMany(models.User_project);
    };

    return User;
};

