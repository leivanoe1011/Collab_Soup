
var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/creation", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("creation", {
        msg: "account creation",
        examples: dbExamples
      });
    });
  });

  app.get("/about", function (req, res) {
    res.render("about", {
      msg: "about page"
    });
  });



  // Load example page and pass in an example by id
  app.get("/example/:id", function (req, res) {

    res.render("creation", {
      example: account
    });

  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
