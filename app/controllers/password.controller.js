const db = require("../models");
const mongoose = require("mongoose");
const Password = db.passwords;

const passSchema = mongoose.Schema({
  website: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  }
});

// Create and Save a new Password
exports.create = (req, res) => {
  // Validate request
  if (!req.body.website) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
  const loginUser = req.headers["username"];
  const Model = mongoose.model(loginUser, passSchema);

  // Save Password in the database
  Model.create({
    website: req.body.website,
    username: req.body.username,
    password: req.body.password
  }).then(()=>{
    res.status(201).send({ message: "Success" });
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });

  
};

// Retrieve all Passwords from the database.
exports.findAll = (req, res) => {
    const website = req.query.website;
    var condition = website ? { website: { $regex: new RegExp(website), $options: "i" } } : {};

    const loginUser = req.headers["username"];
    const Model = mongoose.model(loginUser, passSchema);
  
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

// Find a single Password with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    const loginUser = req.headers["username"];
    const Model = mongoose.model(loginUser, passSchema);

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

// Update a Password by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;

      const loginUser = req.headers["username"];
      const Model = mongoose.model(loginUser, passSchema);
    
      Model.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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

// Delete a Password with the specified id in the request
exports.delete = (req, res) => {

  const loginUser = req.headers["username"];
  const Model = mongoose.model(loginUser, passSchema);

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

// Delete all Passwords from the database.
exports.deleteAll = (req, res) => {

  const loginUser = req.headers["username"];
  const Model = mongoose.model(loginUser, passSchema);

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