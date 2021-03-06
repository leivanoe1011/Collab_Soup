

var exports = module.exports = {};

var db = require("../models");

exports.signin = function (req, res) {
    res.render("profile");
};

exports.creation = function (req, res) {
    res.render("creation");
};

exports.about = function (req, res) {
    res.render("about", { msg: "about page" });
};

exports.feed = function (req, res) {
    res.render("feed", { msg: "Feed Page" });
};

exports.profile = function (req, res) {
    var userId = req.user.id;

    db.User.findAll({ where: { id: userId } }).then(function (dbUser) {
        res.render("profile", {
            user: dbUser[0].dataValues
        });
    });

};

exports.profileId = function (req, res) {
    var selectedId = req.params.id

    db.User.findAll({ where: { id: selectedId } }).then(function (dbUser) {
        res.render("viewingProfile", {
            user: dbUser[0].dataValues
        });
    });
};

exports.logout = function (req, res) {
    req.session.destroy(function (err) {
        res.redirect('/');
    });
};

exports.login = function(req, res){
    res.render("login");
};