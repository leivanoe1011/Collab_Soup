
var env = require("dotenv").config();

var express = require("express");

var exphbs = require("express-handlebars");

// Models
// Here, we are importing the models, and then calling the Sequelize sync function.
var models = require("./models");


// Passport
// import the passport module and the express-session, 
// both of which we need to handle authentication
var passport = require("passport");

// passport has to save a user ID in the session 
// and it uses this to manage retrieving the user details when needed
var session = require("express-session");


// This extracts the entire body part of an incoming 
// request and exposes it in a format that is easier to work with. 
// In this case, we will use the JSON format.
var bodyParser = require('body-parser');


// load is no longer a function, we must use config
var env = require('dotenv').config()
// var env = require("dotenv").load();


var app = express();


var PORT = process.env.PORT || 3000;

// Middleware
// Extended will allow our Request variable within our Routers
// to access form inputs
app.use(express.urlencoded({ extended: true }));

// Middleware below allows the app to parse JSON
app.use(express.json());

// The Middleware below will begin reading the files from the 
// Public Directory
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main" // Server will read main.handlebars firstß
  })
);

app.set("view engine", "handlebars");


// express session and passport session add them both as middleware.
// session secret
app.use(session({ secret: 'keyboard cat',resave: true, saveUninitialized:true})); 

app.use(passport.initialize());
 
app.use(passport.session()); // persistent login sessions


// Routes
require("./routes/htmlRoutes")(app,passport);

require("./routes/apiRoutes")(app);


//load passport strategies
// models.user ... user will mirror the lowercase "user" defined in the user model
require('./config/passport/passport.js')(passport, models.User);



// This will give us the option to restructure our Database based
// ON changes to the Sequelizer

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`

// if (env === "development") {
//   // This will allow us to change our Database every time we initiate the server
//   // IN the test environment

//   syncOptions.force = true;
// }

// Starting the server, syncing our models ------------------------------------/
models.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

