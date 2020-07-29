

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

exports.profile = function(req, res) {
 


    res.render('profile');
 
}


exports.logout = function(req, res) {
 
    req.session.destroy(function(err) {
 
        res.redirect('/');
 
    });
 
}



