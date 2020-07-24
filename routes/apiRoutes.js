
var db = require("../models");

module.exports = function(app) {
    // Get all Users
    app.get("/api/user/:email", function(req, res){
        
        var userEmail = req.params.email;

        db.User.findAll({
            where: {
                email: userEmail
            }
        }).then(function(dbUser){
            res.json(dbUser);
        });
        // End of Then
    });
    // End of get by Email

    app.post("/api/user", function(req, res){
        
        console.log("In api post");

        var newUser = req.body;

        console.log(newUser);
        db.User.create(newUser). then(function(dbUser){
            res.json(dbUser);
        })
    })
}

