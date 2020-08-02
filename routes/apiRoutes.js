
var db = require("../models");

module.exports = function (app) {

    // Get all Users
    app.post("/api/userByEmail", function (req, res) {

        var userEmail = req.body.email;
        var userPass = req.body.password;

    });
    // End of get by Email

    app.get("/api/userById/:id", function (req, res) {
        var userId = req.params.id;

        // var userEmail = null;



        db.User.findAll({ where: { id: userId } }).then(function (dbUser) {
            res.json(dbUser);
        });
    })


    app.post("/api/user", function (req, res) {



        var newUser = req.body;

        db.User.create(newUser).then(function (dbUser) {
            res.json(dbUser);
        })
    });


    app.post("/api/userLanguage", function (req, res) {

        // The ID will get passed down here
        // have to make sure we bring in the User_ID
        // Our association will make that connection of User_ID to the foreign key
        var newLanguage = req.body;

        db.User_language.create(newLanguage).then(function (dbLang) {
            res.json(dbLang);
        })

    });


    app.post("/api/project", function (req, res) {
        var id = req.user.id
        console.log(id)

        var newProject = {
            project_name: req.body.projectName,
            project_description: req.body.projDesc
        }
        console.log(newProject)

        db.Project.create(newProject).then(function (dbProject) {
            var projId = dbProject.id

            var userProj = {
                UserId: id,
                ProjectId: projId
            }

            db.User_project.create(userProj).then(function () {});

            var languageProperties = [];
            var propertyNames = Object.getOwnPropertyNames(req.body);

            for (var i = 0; i < propertyNames.length; i++) {

                var propertyName = propertyNames[i].toLowerCase();

                if (propertyName.includes("language")) {
                    languageProperties.push(propertyName);
                };
            };

            if (languageProperties.length > 0) {

                for (var i = 0; i < languageProperties.length; i++) {
                    var lang = languageProperties[i];
                   
                    var userLang = {
                        ProjectId: projId,
                        language_name: req.body[lang]
                    }

                    
                    db.Project_language.create(userLang).then(function (userLanguage, created) {
                        if (!userLanguage) {
                            return done(null, false);
                        }
                    });
                    
                }

            }

        });

        res.redirect("/feed")

    });


    app.post("/api/projectLanguage", function (req, res) {
        var newProjLang = req.body;
        db.Project_language.create(newProjLang).then(function (dbProjLang) {
            res.json(dbProjLang);
        });
    });


    app.post("/api/userProject", function (req, res) {
        var newUserProj = req.body;

        db.User_project.create(newUserProj).then(function (dbUserProject) {
            res.json(dbUserProject);
        });
    });


    // get all projects by User
    app.get("/api/userProject/:id", function (req, res) {
        var userId = req.params.id;

        db.User_project.findAll({ where: { user_id: userId } }).then(function (dbUserProject) {
            res.json(dbUserProject);
        });
    });


    // get all users by Project
    app.get("/api/projectUser/:id", function (req, res) {
        var projectId = req.params.id;

        db.User_project.findAll({ where: { project_id: projectId } }).then(function (dbProjectUser) {
            res.json(dbProjectUser);
        });
    });


    app.get("/api/userLanguage/:id", function (req, res) {

        var userId = req.params.id;

        db.User_language.findAll({ where: { user_id: userId } }).then(function (userLang) {
            res.json(userLang);
        });
    });


    app.get("/api/projLanguage/:id", function (req, res) {

        var projectId = req.params.id;
        db.Project_language.findAll({ where: { project_id: projectId } }).then(function (projLang) {
            res.json(projLang);
        });
    });


    app.get("/api/project/:id", function (req, res) {
        var projectId = req.params.id;
        db.Project.findAll({ where: { id: projectId } }).then(function (dbProject) {
            res.json(dbProject);
        });
    });

    app.get("/api/projectAll", function (req, res) {
        db.Project_language.findAll({
            include: [{
                model: db.Project
            }]
        }).then(function (dbProject) {
            res.json(dbProject);

            console.log(dbProject)
        });
    })
}

