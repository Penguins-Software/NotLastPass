module.exports = app => {
    const passwords = require("../controllers/password.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Password
    router.post("/", passwords.create);
  
    // Retrieve all Passwords
    router.get("/", passwords.findAll);
  
    // Retrieve a single Password with id
    router.get("/:id", passwords.findOne);
  
    // Update a Password with id
    router.put("/:id", passwords.update);
  
    // Delete a Password with id
    router.delete("/:id", passwords.delete);
  
    // Create a new Password
    router.delete("/", passwords.deleteAll);
  
    //API Path
    app.use('/api/passwords', router);
  };