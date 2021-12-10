// express is for building the Rest apis
const express = require("express");

// body-parser helps to parse the request and create the req.body object
const bodyParser = require("body-parser");

// cors provides Express middleware to enable CORS with various options.
const cors = require("cors");

const app = express();

// Disable `X-POWERED-BY` HTTP header
// JS-S1004
app.disable("x-powered-by");

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

// In production
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:
// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and re-sync db.");
// });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to jsjro application." });
});

require("./app/routes/post.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT);
