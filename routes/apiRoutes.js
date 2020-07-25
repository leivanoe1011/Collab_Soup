
var db = require("../models");

module.exports = function(app) {
    // Get all Users
    app.get("/api/user/:email", function(req, res){
        
        var userEmail = req.params.email;

        db.User.findAll({ where: { email: userEmail } }).then(function(dbUser){
            res.json(dbUser);
        });
        // End of Then
    });
    // End of get by Email

    app.post("/api/user", function(req, res){
        
        console.log("In api post");

        var newUser = req.body;

        console.log(newUser);
        db.User.create(newUser).then(function(dbUser){
            res.json(dbUser);
        })
    });

    app.post("/api/userLanguage", function(req, res){

        var newLanguage = req.body;

        db.User_language.create(newLanguage).then(function(dbLang){
            res.json(dbLang);
        })

    });

    app.post("/api/project", function(req, res){
        var newProject = req.body;
        db.Project.create(newProject).then(function(dbProject){
            res.json(dbProject);
        });
    });

    app.post("/api/projectLanguage", function(req, res){
        var newProjLang = req.body;
        db.Project_language.create(newProjLang).then(function(dbProjLang){
            res.json(dbProjLang);
        });
    });

    app.get("/api/userLanguage/:id", function(req, res){
       
        var userId = req.params.id;
       
        db.User_language.findAll({ where: { user_id: userId } }).then(function(userLang){
            res.json(userLang);
        });
    });

    app.get("/api/projLanguage/:id", function(req, res){

        var projectId = req.params.id;
        db.Project_language.findAll({ where: {project_id: projectId} } ).then(function(projLang){
            res.json(projLang);
        })
    });

    app.get("/api/project/:id", function(req, res){
        var projectId = req.params.id;
        db.Project.findAll({ where: { id: projectId } }).then(function(dbProject){
            res.json(dbProject);
        })
    })
}

