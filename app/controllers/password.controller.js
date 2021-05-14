const db = require("../models");
const Password = db.passwords;

// Create and Save a new Password
exports.create = (req, res) => {
  // Validate request
  if (!req.body.website) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  
  // Create a Password
  const password = new Password({
    website: req.body.website,
    username: req.body.username,
    password: req.body.password
  });

  // Save Password in the database
  password
    .save(function (err, newPost) {
      if (err) {
        res.status(500).json({
          message : err.message
        });
      } else {
        //Save ok
        res.status(201).send(newPost);
      }
    })
};

// Retrieve all Passwords from the database.
exports.findAll = (req, res) => {
    const website = req.query.website;
    var condition = website ? { website: { $regex: new RegExp(website), $options: "i" } } : {};
  
    Password.find(condition)
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

    Password.findById(id)
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
    
      Password.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
    Password.findByIdAndRemove(id)
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
    Password.deleteMany({})
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