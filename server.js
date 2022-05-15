const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:80"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false 
  })
  .then(() => {
    console.log("Connected to the "+db.url+" database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database "+db.url, err);
    process.exit();
  });

// set up rate limiter: maximum of ten requests per minute
var RateLimit = require('express-rate-limit');
var limiter = new RateLimit({
  windowMs: 60*1000, // 1 minute
  max: 100
});

app.use(limiter);

//Looks in 
const path = __dirname + '/frontend/build/';
app.use(express.static(path));
require("./app/routes/password.routes")(app);
require("./app/routes/auth.routes")(app);

app.get('/', function (req,res) {
  res.sendFile(path + "index.html");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
