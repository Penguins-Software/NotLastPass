const db = require("../models");
const User = db.users;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    console.log("CheckDup: " + JSON.stringify(req.body));
    User.findOne({
        username: req.body.username
      }).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
        if (user) {
          res.status(400).send({ message: "Failed! Username is already in use!" });
          return;
        }
  
      // Email
      User.findOne({
          email: req.body.email
        }).exec((err, user) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
      
            if (user) {
              res.status(400).send({ message: "Failed! Email is already in use!" });
              return;
            }
      
            next();
      });
    });
  };

  const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
  };
  
  module.exports = verifySignUp;