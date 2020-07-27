
var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
      res.render("index", {
        msg: "Welcome!",
      });
  });

  app.get("/creation", function (req, res) {
    res.render("creation", {
      examples: dbExamples
    });
  });

  app.get("/about", function (req, res) {
    res.render("about", {
      msg: "about page"
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
