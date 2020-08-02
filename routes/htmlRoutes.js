
var db = require("../models");

// Flash was passed to App in the server js under app.use();
// var flash = require("connect-flash");

var authController = require('../controllers/htmlController.js');

module.exports = function (app, passport) {

  // The two functions below will not be used 
  // since we are using Modals
  // app.get('/signup', authController.signup);
  // app.get('/signin', authController.signin);


  function isLoggedIn(req, res, next) {

    if (req.isAuthenticated()) return next();

    // If not authenticated, then redirect to the signin page
    res.redirect("/creation");
  }

  
  app.get("/signin", (req, res, next) => {
    const err = req.flash().error || [];
    res.render("login", {err});
  });


  // The initial Signin will go here first. 
  // If it fails, then it will go to the GET route above
  app.post("/signin", passport.authenticate("local-signin", {
      failureFlash: true, 
      failureRedirect: "/signin"
    }), (req, res, next) => {
      res.redirect("/profile");
  });



  app.post('/creation', passport.authenticate('local-creation', {

    // successRedirect: '/dashboard',
    successRedirect: '/profile',

    failureRedirect: '/creation'

  }

  ));


  // app.post('/signin', function(req, res, next){
  //   passport.authenticate('local-signin', function(err, user, info){




  //   });
  // });


  // app.get('/signin', function(req, res, next) {
  //   passport.authenticate('local-signin', function(err, user, info) {
  //     if (err) { return next(err) }
  //     if (!user) {
  //       // *** Display message without using flash option
  //       // re-render the login form with a message
  //       return res.render('login', { message: info.message })
  //     }
      
  //     return res.redirect("/profile");
      
  //   })(req, res, next);
  // });


  // app.post('/signin', passport.authenticate('local-signin', {

  //         // successRedirect: '/dashboard',
  //         successRedirect: "/profile",

  //         failureRedirect: "/"
  //     }
  
  // ));


  

  // make sure the page can only be accessed when a user is logged into the session
  // app.get('/dashboard', isLoggedIn, authController.dashboard);
  app.get('/profile', isLoggedIn, authController.profile);

  app.get('/logout', authController.logout);


  // Load index page
  app.get("/", function (req, res) {
    res.render("index", {
      msg: "Welcome!",
    });
  });


  app.get("/creation", authController.creation);


  app.get("/about", authController.about);


  app.get("/feed", authController.feed);
};