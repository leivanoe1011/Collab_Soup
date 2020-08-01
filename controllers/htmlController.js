

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


exports.profile = function (req, res, res2) {

    // console.log(req);

    var userId = req.user.id


    db.User.findAll({ where: { id: userId } }).then(function (dbUser) {
        // console.log(dbUser);
        
        res.render("profile", { user: dbUser[0].dataValues});
        
    });

};


exports.logout = function (req, res) {

    req.session.destroy(function (err) {

        res.redirect('/');
    });

};



