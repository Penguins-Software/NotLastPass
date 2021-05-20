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

    //Create a new encrypted password
    router.post("/Enc", [authJwt.verifyToken], passwords.createEnc);
  
    // Retrieve all encrypted Passwords
    router.get("/", [authJwt.verifyToken], passwords.findAll);

    // Retrieve all Passwords
    router.get("/Enc", [authJwt.verifyToken], passwords.findAllEnc);
  
    // Retrieve a single Password with id
    router.get("/:id", [authJwt.verifyToken], passwords.findOne);

    // Retrieve a single Encrypted Password with id
    router.get("/Enc/:id", [authJwt.verifyToken], passwords.findOneEnc);
  
    // Update a Password with id
    router.put("/:id", [authJwt.verifyToken], passwords.update);

    // Update a Encrypted Password with id
    router.put("/Enc/:id", [authJwt.verifyToken], passwords.updateEnc);
  
    // Delete a Password with id
    router.delete("/:id", [authJwt.verifyToken], passwords.delete);

    // Delete a Encrypted Password with id
    router.delete("/Enc/:id", [authJwt.verifyToken], passwords.deleteEnc);
  
    // Delete all passwords
    router.delete("/", [authJwt.verifyToken], passwords.deleteAll);

    // Delete all Encrypted passwords
    router.delete("/Enc", [authJwt.verifyToken], passwords.deleteAllEnc);
  
    //API Path
    app.use('/passwords', router);
  };