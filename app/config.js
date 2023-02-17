require('dotenv').config()

const db = require("./models/index");
const Role = db.role;

// Local
exports.dbConnect = (mongoose) => {
  mongoose.Promise = global.Promise;
  mongoose
    // .connect(process.env.DB_URI_LOCAL, { useNewUrlParser: true })
    .connect(process.env.DB_URI_ATLAS, { useNewUrlParser: true })
    .then(() => {
      console.log("Successfully connect to the database");
      initial()
    })
    .catch((err) => {
      console.log("Could not connect to the database. Error...", err);
      process.exit();
    });
};

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  })
}

exports.App = (app, bodyParser) => {
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));

  // parse requests of content-type - application/json
  app.use(bodyParser.json());

  // Route is server running
  app.get("/", (req, res) => {
    res.json({ message: "Server is running" });
  });
};
