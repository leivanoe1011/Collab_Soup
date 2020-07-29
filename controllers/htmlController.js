

var exports = module.exports = {}

var db = require("../models");



exports.signup = function(req, res) {
    res.render("signup");
}

exports.signin = function(req, res){
    res.render("signin");
}


exports.dashboard = function(req, res) {
 
    console.log("In html controller dashboard");
    console.log(req);
    res.render('dashboard');
 
}


exports.creation = function(req, res){
    res.render("creation");
}


exports.about = function(req, res){
    res.render("about", {msg: "about page"});
}


exports.feed = function(req, res){
    res.render("feed", {msg: "Feed Page"});
}


exports.profile = function(req, res) {

    console.log(req);
    res.render('profile');
}


exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}



