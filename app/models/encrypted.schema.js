
const mongoose = require('mongoose');

module.exports = mongoose.Schema({
    encrypted: {
      type: String,
      require: true
    }
  }, { _id: true })