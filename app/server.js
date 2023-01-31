require('dotenv').config()
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose"); // local
const { dbConnect, App } = require("./config.js");
const { routes } = require("./routes/app.route.js");

exports.serverRun = () => {
  let PORT = process.env.PORT;

  // db mongo connect
  // Local
  dbConnect(mongoose);

  // Init express
  const app = express();

  app.use(cors());

  // app express config
  App(app, bodyParser);

  routes(app);

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
