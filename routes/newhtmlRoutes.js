var db = require("../models");

var path = require("path");

module.exports = function(app) {
  // Load index page

    app.get("/", function(req, res) {
    db.index.findAll({}).then(function(index) {
      res.render("Main", {
        msg: "Welcome!",
        examples: index
      });
    });
  });

  
  // Load example page and pass in an example by id
  app.get("/:id", function(req, res) {
    db.User_languges.findOne({ where: { id: req.params.id } }).then(function(User_languges) {
      res.render("Main", {
        example: User_languges
      });
    });
  });

  app.get("/:id", function (req, res) {
    db.User_project.findOne({ where: { id: req.params.id } }).then(function(User_project) {
      res.rend("Main", {
        example: User_project
      });
    });
  });

  app.get("/:id", function(req, res) {
    db.User.findOne({ where: { id: req.params.id } }).then(function(User) {
      res.render("Main", {
        example: User
      });
    });
  });

  app.get("/:id", function(req, res) {
    db.Project.findOne({ where: { id: req.params.id } }).then(function(Project) {
      res.render("Main", {
        example: Project
      });
    });
  });


  app.get("/:id", function(req, res) {
    db.Project_Language.findOne({ where: { id: req.params.id } }).then(function(Project_Language) {
      res.render("Main", {
        example: Project_Language
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
