const { authJwt } = require("../middleware");

module.exports = app => {
    const passwords = require("../controllers/password.controller.js");
  
    var router = require("express").Router();

    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    // Create a new Password
    router.post("/", [authJwt.verifyToken], passwords.create);
  
    // Retrieve all Passwords
    router.get("/", [authJwt.verifyToken], passwords.findAll);
  
    // Retrieve a single Password with id
    router.get("/:id", [authJwt.verifyToken], passwords.findOne);
  
    // Update a Password with id
    router.put("/:id", [authJwt.verifyToken], passwords.update);
  
    // Delete a Password with id
    router.delete("/:id", [authJwt.verifyToken], passwords.delete);
  
    // Delete all passwords
    router.delete("/", [authJwt.verifyToken], passwords.deleteAll);
  
    //API Path
    app.use('/passwords', router);
  };