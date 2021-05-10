require('dotenv').config();

console.log("Connecting to: " + process.env.DB_URL);

module.exports = {
    url: process.env.DB_URL
  };