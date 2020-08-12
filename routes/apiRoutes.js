var db = require("../models");

module.exports = function (app, passport) {
    // Validate if user is logged in
    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated()) return next();

        // If not authenticated, then redirect to the signin page
        res.redirect("/creation");
    };

    // Get all Users
    app.post("/api/userByEmail", function (req, res) {

        var userEmail = req.body.email;
        var userPass = req.body.password;

    });
    // End of get by Email

    // We get the ID from the Session
    // Only a logged in User may update the user
    app.get("/api/userById/", isLoggedIn, function (req, res) {
        var userId = req.user.id;

        // var userEmail = null;

        db.User.findAll({ where: { id: userId } }).then(function (dbUser) {

            res.json(dbUser);
        });
    })



    // This post will only be used if the user is already logged in. 
    // Otherwise, we need to create the user languages when the user is created
    app.post("/api/userLanguage", isLoggedIn, function (req, res) {


        // The ID will get passed down here
        // have to make sure we bring in the User_ID
        // Our association will make that connection of User_ID to the foreign key
        var newLanguage = req.body;

        db.User_language.create(newLanguage).then(function (dbLang) {
            res.json(dbLang);
        });

    });


    // We need to be logged in to get the Users
    // This route might need to be moved to the HTML route
    app.get("/api/users/:id", isLoggedIn, function (req, res) {
        
        var userId = req.params.id;

        console.log("In get users");


        db.User.findAll({ where: { id: userId} }).then(function (dbUsers) {
            res.json(dbUsers[0].dataValues.firstname);
        });
    });


    // User is only able to create a project when logged in
    // This should be an HTML route
    app.post("/api/project", isLoggedIn, function (req, res) {


        var loggedUserId = req.user.id;


        var newProject = {
            project_name: req.body.projectName,
            project_description: req.body.projDesc
        };

        db.Project.create(newProject).then(function (dbProject) {

            var projId = dbProject.id

            var userProj = {
                UserId: loggedUserId,
                ProjectId: projId,
                project_owner: 1 // Created the project
            };

            db.User_project.create(userProj);

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
                    };

                    db.Project_language.create(userLang).then(function (userLanguage, created) {
                        if (!userLanguage) {
                            return done(null, false);
                        };
                    });

                };

            };

        });

        res.redirect("/feed");

    });


    // User is only able to create a project language when logged in
    // This should be an HTML route
    app.post("/api/projectLanguage", isLoggedIn, function (req, res) {

        var newProjLang = req.body;
        db.Project_language.create(newProjLang).then(function (dbProjLang) {
            res.json(dbProjLang);
        });
    });


    // User is only able to create a project language when logged in
    // This should be an HTML route
    app.post("/api/userProject", isLoggedIn, function (req, res) {

        var newUserProj = req.body;

        db.User_project.create(newUserProj).then(function (dbUserProject) {
            res.json(dbUserProject);
        });
    });

    app.get("/api/userProject/", function (req, res) {

    // This GET can be accessed only when logged in
    app.get("/api/userProject/", isLoggedIn, function(req, res){
        console.log("In user project get");

        var sessionUserId = req.user.id;

        db.User_project.findAll(
            {
                where: { UserId: sessionUserId },
                include: [{
                    model: db.Project,
                    include: [{ model: db.Project_language }]
                }]
            })
            .then(function (result) {
                res.json(result);
            });
    });

    app.get("/api/userProject/:id", function (req, res) {
        var profileId = req.params.id;

        // Below we are linking the User Project table to the Project table
        // At the same time, bringin in Project Language table linked to the Project table
        db.User_project.findAll(
            {
                where: { UserId: profileId },
                include: [{
                    model: db.Project,
                    include: [{ model: db.Project_language }]
                }]
            })
            .then(function (result) {
                res.json(result);
            });
    });


    // get all Users by Project ID
    app.get("/api/projectUser/:id", function (req, res) {
        var projectId = req.params.id;

        db.User_project.findAll({ where: { project_id: projectId } }).then(function (dbProjectUser) {
            res.json(dbProjectUser);
        });
    });


    // We don't need to be logged in to get the user programming languages

    app.get("/api/userLanguage/:id", function (req, res) {
        var userId = req.params.id;

        db.User_language.findAll({ where: { user_id: userId } }).then(function (userLang) {
            res.json(userLang);
        });
    });


    // We don't need to be logged in to get the project programming languages

    app.get("/api/projLanguage/:id", function (req, res) {
        var projectId = req.params.id;

        db.Project_language.findAll({ where: { project_id: projectId } }).then(function (projLang) {
            res.json(projLang);
        });
    });


    // All the projects can be accessed if we are logged in or not
    app.get("/api/projectAll", function (req, res) {
        
        console.log("In GET API call Project All");


        var currentUserId = 0;


        // Here we briging back the users that own the projects as well

        db.Project.findAll({
            include: [{
                model: db.Project_language
            }, {
                model: db.User_project
            }]
        }).then(function (dbProject) {


            // The current User Id will be used to validate who is the owner of the project
            res.json({response: dbProject, currentUserId: currentUserId});
        });

    });

    // We get the ID from the Session
    // Only a logged in User may update the user
    // Here we can validate if user is logged in or not since 
    // The session ID will either be available or not
    app.put("/api/userUpdate/", isLoggedIn, function (req, res) {

        // console.log(req);
        var userId = req.user.id;
        var reqObj = req.body;
        var propertyNames = Object.getOwnPropertyNames(reqObj);
        var columnToUpdate = propertyNames[0];
        var valueOfCol = reqObj[columnToUpdate];

        var updateStatement = {};

        updateStatement[columnToUpdate] = valueOfCol;


        db.User.update(
            updateStatement,
            { where: { id: userId } }
        )
            .then(function (dbUser) {
                res.json(dbUser);
            });

    });

    // get all projects by User
    // Not used
    app.get("/api/userProject2/", isLoggedIn, function (req, res) {
        
        console.log("In user project get");
        

        var sessionUserId = req.user.id;

        db.User_project.findAll({
            where: { UserId: sessionUserId },
            include: [{
                model: db.Project
            }]

        })
            .then(function (dbUserProject) {

                // Load all the projects for a user
                var result = [];

                //var projectObjects = {}

                // db.Project_language.findAl({where: {id: }})


                // Below we are capturing all the Projects the User belongs to
                for (var i = 0; i < dbUserProject.length; i++) {

                    var projectObject = {};

                    var newObj = dbUserProject[i].dataValues;
                    // console.log(newObj);

                    projectObject["ProjectOwner"] = newObj.project_owner;
                    projectObject["UserId"] = newObj.UserId;

                    var currentProjectId = newObj.ProjectId;
                    projectObject["ProjectId"] = currentProjectId;
                    projectObject["ProjectName"] = newObj.Project.dataValues.project_name;

                    // Load all the Languages for the current project
                    var projectLanguages = [];

                    // Within one project we are going to capture all the Languages 
                    // For that project
                    db.Project_language.findAll({ where: { ProjectId: currentProjectId } })
                        .then(function (prjLang) {

                            // console.log(prjLang);
                            // create a for loop and push projectLanguages
                            for (var i = 0; i < prjLang.length; i++) {

                                var newLang = prjLang[i].dataValues;

                                var lang = newLang.language_name;

                                projectLanguages.push(lang);
                            };
                            // End of capturing all the languages

                            projectObject["ProjectLanguages"] = projectLanguages;

                        });
                    // End of Querying all the languages for one project

                    result.push(projectObject);
                };

                // End of For Loop on dbUserProject
                res.json(result);

            });
    });



    // Not used


    // This ROUTE is no longer needed since Passport creates the user
    // app.post("/api/user", function (req, res) {


    //     var newUser = req.body;

    //     db.User.create(newUser).then(function (dbUser) {
    //         res.json(dbUser);
    //     })
    // });


    // Validate if the user is Logged In to JOIN
    app.post("/api/joinProject", isLoggedIn, function (req, res) {


        var newObj = req.body

        var useraddedId = req.user.id;

        newObj.UserId = useraddedId;
   
        db.User_project.create(newObj).then(function (dbProjId) {
            
            res.json(dbProjId);

        });
    });

}


        });
    });
};