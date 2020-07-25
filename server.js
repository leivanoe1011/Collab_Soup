require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
// Extended will allow our Request variable within our Routers
// to access form inputs
app.use(express.urlencoded({ extended: false }));

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

// Routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


// This will give us the option to restructure our Database based
// ON changes to the Sequelizer

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`

if (process.env.NODE_ENV === "test") {
  // This will allow us to change our Database every time we initiate the server
  // IN the test environment

  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;

