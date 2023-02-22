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

  const http = require('http').createServer(app)

  const io = require('socket.io')(http)

  io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('status activity', (msg) => {
      console.log(`status: `, msg);
      io.emit('status activity', msg)
    })

    socket.on('disconnect', () => {
      console.log('A user disconnected');
    })
  })

  app.use(cors());

  // app express config
  App(app, bodyParser);

  routes(app);

  http.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};
