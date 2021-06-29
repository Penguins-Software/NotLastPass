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

    //Create a new encrypted password
    router.post("/Enc", [authJwt.verifyToken], passwords.createEnc);

    // Retrieve all Passwords
    router.get("/Enc", [authJwt.verifyToken], passwords.findAllEnc);

    // Retrieve a single Encrypted Password with id
    router.get("/Enc/:id", [authJwt.verifyToken], passwords.findOneEnc);

    // Update a Encrypted Password with id
    router.put("/Enc/:id", [authJwt.verifyToken], passwords.updateEnc);

    // Delete a Encrypted Password with id
    router.delete("/Enc/:id", [authJwt.verifyToken], passwords.deleteEnc);

    // Delete all Encrypted passwords
    router.delete("/Enc", [authJwt.verifyToken], passwords.deleteAllEnc);
  
    //API Path
    app.use('/passwords', router);
  };