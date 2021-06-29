const db = require("../models");
const encrSchema = require("../models/encrypted.schema");
const mongoose = require("mongoose");

// Create and Save a new Password
exports.createEnc = (req, res) => {
  // Validate request
  if (!req.body.encrypted) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
  const loginUser = req.headers["username"];
  const Model = mongoose.model(loginUser, encrSchema);

  // Save Password in the database
  Model.create({
    encrypted: req.body.encrypted
  }).then(()=>{
    res.status(201).send({ message: "Success" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

// Retrieve all Passwords from the database.
exports.findAllEnc = (req, res) => {
  const website = req.query.website;
  var condition = website ? { website: { $regex: new RegExp(website), $options: "i" } } : {};

  const loginUser = req.headers["username"];
  const Model = mongoose.model(loginUser, encrSchema);

  Model.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Password."
      });
    });
};

// Find a single Encrypted Password with an id
exports.findOneEnc = (req, res) => {
  const id = req.params.id;

  const loginUser = req.headers["username"];
  const Model = mongoose.model(loginUser, encrSchema);

  Model.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Password with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Password with id=" + id });
    });
};

// Update a Encrypted Password by the id in the request
exports.updateEnc = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const passwordUpdate = req.body;

    if(!passwordUpdate.encrypted){
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;

    const loginUser = req.headers["username"];
    const Model = mongoose.model(loginUser, encrSchema);
  
    Model.findByIdAndUpdate(id, passwordUpdate, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Password with id=${id}. Maybe Password was not found!`
          });
        } else res.send({ message: "Password was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Password with id=" + id
        });
      });
};

// Delete a Encrypted Password with the specified id in the request
exports.deleteEnc = (req, res) => {

  const id = req.params.id;

  const loginUser = req.headers["username"];
  const Model = mongoose.model(loginUser, encrSchema);

  Model.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Password with id=${id}. Maybe Password was not found!`
        });
      } else {
        res.send({
          message: "Password was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Password with id=" + id
      });
    });
};

// Delete all Encrypted Passwords from the database.
exports.deleteAllEnc = (req, res) => {

  const loginUser = req.headers["username"];
  const Model = mongoose.model(loginUser, encrSchema);

  Model.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Passwords were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Passwords."
      });
    });
};