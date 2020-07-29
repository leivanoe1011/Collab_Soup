
var db = require("../models");

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
      res.render("profile", { example: dbUser[0].dataValues});
      console.log(dbUser[0].dataValues);
    });
  })

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
