
var db = require("../models");

var authController = require('../controllers/htmlController.js');

module.exports = function(app, passport) {

  // The two functions below will not be used 
  // since we are using Modals
  // app.get('/signup', authController.signup);
  // app.get('/signin', authController.signin);


  function isLoggedIn(req, res, next){

    if(req.isAuthenticated()) return next();

    // If not authenticated, then redirect to the signin page
    res.redirect("/signin");
  }

  
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


   // Load index page
   app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!",
    });
  });


  app.get("/creation", authController.creation);


  app.get("/about", authController.creation);


  app.get("/profile", isLoggedIn, authController.profile);


  app.get("/feed", authController.feed);


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });

}


















