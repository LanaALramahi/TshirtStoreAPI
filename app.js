const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

//Import API routes
const tshirtRoute = require("./routes/TshirtRoute");
const categoryRoute = require("./routes/CategoryRoute");
const orderRoute = require("./routes/OrderRoute");

// using body-parser package to convert models into json objects always before hit any endpoint (Middleware)
app.use(bodyParser.json());

// post new t-shirt endpoint
app.use("/tshirt", tshirtRoute);
// post new category endpoint
app.use("/category", categoryRoute);
// post new order endpoint
app.use("/order", orderRoute);

// default store welcome page message
app.get("/", (req, res) => {
  res.send("Welcome to the store");
});

//DB connection
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  console.log("connected to DB!")
);

// server port
app.listen(3000);
