const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { dbConnect, App } = require("./config.js");
const { routes } = require("./routes/app.route.js");

exports.serverRun = () => {
  let PORT = 8080;

  // db mongo connect
  dbConnect(mongoose);

  // Init express
  const app = express();

  // app express config
  App(app, bodyParser);

  routes(app);

  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
