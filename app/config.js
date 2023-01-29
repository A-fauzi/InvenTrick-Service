// Local
exports.dbConnect = (mongoose) => {
  mongoose.Promise = global.Promise;
  mongoose
    .connect("mongodb://127.0.0.1:27017/warehouse", { useNewUrlParser: true })
    .then(() => {
      console.log("Successfully connect to the database");
    })
    .catch((err) => {
      console.log("Could not connect to the database. Error...", err);
      process.exit();
    });
};

exports.App = (app, bodyParser) => {
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(bodyParser.json());

  app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
  });
};
