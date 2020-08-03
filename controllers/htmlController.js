

var exports = module.exports = {}

var db = require("../models");



exports.signup = function (req, res) {
    res.render("creation");
}

exports.signin = function (req, res) {
    res.render("profile");
}


exports.dashboard = function (req, res) {

    console.log("In html controller dashboard");
    console.log(req);
    res.render('dashboard');

}


exports.creation = function (req, res) {
    res.render("creation");
}


exports.about = function (req, res) {
    res.render("about", { msg: "about page" });
}


exports.feed = function (req, res) {
    res.render("feed", { msg: "Feed Page" });
}


exports.profile = function (req, res) {

    // console.log(req);

    var userId = req.user.id


    db.User.findAll({ where: { id: userId } }).then(function (dbUser) {
        // console.log(dbUser);

        if (dbUser[0].dataValues.github === " " || dbUser[0].dataValues.linkedin === " ") {
            dbUser[0].dataValues.github = null;
            dbUser[0].dataValues.linkedin = null;
        }

        // db.User_project.findAll({ where: { user_id: userId } }).then(function (dbProjects) {

            // console.log(dbProjects)

            res.render("profile", {
                user: dbUser[0].dataValues,
                // projects: dbProjects,
            });

        // });

    });

};


exports.logout = function (req, res) {

    req.session.destroy(function (err) {

        res.redirect('/');
    });

};

exports.login = function(req, res){
    res.render("login");
}



