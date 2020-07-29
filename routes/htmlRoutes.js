
var db = require("../models");

var authController = require('../controllers/htmlController.js');

module.exports = function(app, passport) {

  // The two functions below will not be used 
  // since we are using Modals
  // app.get('/signup', authController.signup);
  // app.get('/signin', authController.signin);


  app.post('/signup', passport.authenticate('local-signup', {

          // successRedirect: '/dashboard',
          successRedirect: '/profile',

          failureRedirect: '/signup'
      }

  ));


  app.post('/signin', passport.authenticate('local-signin', {

          // successRedirect: '/dashboard',
          successRedirect: '/profile',
  
          failureRedirect: '/signin'
      }
  
  ));


  // make sure the page can only be accessed when a user is logged into the session
  app.get('/dashboard', isLoggedIn, authController.dashboard);
  // app.get('/profile', isLoggedIn, authController.profile);

  app.get('/logout',authController.logout);


  function isLoggedIn(req, res, next){
    
    if(req.isAuthenticated()) return next();

    res.redirect("/signin");
  }


module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!",
    });
  });

  app.get("/creation", function (req, res) {
    res.render("creation");
  });

  app.get("/about", function (req, res) {
    res.render("about", {
      msg: "about page"
    });
  });

  app.get("/feed", function (req, res) {
    res.render("feed", {
      msg: "Feed page"
    });
  });

  app.get("/profile/:id", function (req, res) {
    var userId = req.params.id;

    db.User.findAll({ where: { id: userId } }).then(function (dbUser) {
      res.render("profile", { user: dbUser })
    })
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};





